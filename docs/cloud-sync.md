# 云同步配置（Supabase）

站点默认是纯本地模式：进度存在浏览器的 `localStorage` 里。启用云同步后，用 GitHub 账号登录即可在多台设备间同步进度。

```text
GitHub Pages：继续托管网页（纯静态）
        ↓
Supabase Auth：GitHub 账号登录
        ↓
Supabase 数据库：保存每个账号的学习记录
        ↕
浏览器 localStorage：离线缓存
```

GitHub Pages 只负责发布 HTML / CSS / JS，本身没有保存用户数据的后端能力，所以需要 Supabase 这类云服务。

## 同步行为

| 场景 | 行为 |
| --- | --- |
| 未登录 | 与原来一致，记录只存在本机（`lp.progress.v1.guest`） |
| 第一次登录 | 询问是否把本机已有记录合并到账号；不合并也保留在本机 |
| 已登录 | 每次答题先写本机，延迟约 1 秒自动上传 |
| 换设备 | 登录同一 GitHub 账号后自动下载并合并 |
| 临时断网 | 照常答题，恢复网络后自动补同步 |
| 手动备份 | JSON 导出 / 导入继续保留 |
| 正在进行的综合练习 | 只存在本机（`lp.session.v1`），不跨设备同步 |

同步范围：已提交的作答、错题次数、收藏、待复习。

## 多个 GitHub 账号

同一台电脑登过两个账号时，记录**不会互相覆盖**，因为本机按账号 ID 分开存：

```text
lp.progress.v1.guest                              未登录时的记录
lp.progress.v1.user.<账号ID A>                    A 的记录
lp.progress.v1.user.<账号ID B>                    B 的记录
```

云端同理，`progress_records` 的主键是 `(user_id, qid)`，RLS 只让每个账号看到自己的行；
`cloud.js` 拉取时还会再显式带一次 `user_id` 过滤，策略被改宽也不会串号。

判断「我现在用的是哪个账号」，看数据页「云同步」卡片：

```text
已登录：@nyatskr · nyatskr@example.com · ID a1b2c3d4
```

- `@用户名` 来自 GitHub 登录名（`user_name`）。
- 邮箱需要登录时授权 `user:email`，代码里已经带上；早期登录的会话可能没有，
  卡片会提示「未取到邮箱」，退出后重新登录一次即可补上。
- `ID` 是 Supabase 用户 ID 前 8 位，**一定存在**，邮箱缺失时靠它区分。

点卡片上的「账号核对」可以看：当前账号的用户名 / 邮箱 / 完整 ID / 云端条数，
以及本机缓存过的每个作用域各有几条记录。这个面板只读，不会合并、修改或删除任何记录。

## 按题号清除记录（维护用）

界面上只有「清空本机」「清空云端」两种粒度，想删掉某一节的几条记录时，用浏览器控制台两步走。
**只删你列出来的题号，其它记录不动**；本机和云端一起删，云端只删当前账号的行。

```js
// 1. 先看这些题在当前账号里有没有（本机 / 云端分开显示）
await LP.cloud.probeQids(['A074', 'A033', 'A034', 'P045', 'P046']);

// 2. 确认无误再删
await LP.cloud.purgeQids(['A074', 'A033', 'A034', 'P045', 'P046']);
```

返回示例：

```js
{ asked: [...], removedLocal: 5, removedCloud: 5 }
```

删之前先导出一次 JSON 备份；删除不可撤销。换账号后要重新执行一次——每个账号的记录是分开的。

---

## 一、创建 Supabase 项目

1. 打开 [Supabase Dashboard](https://supabase.com/dashboard)，用 GitHub 登录。
2. `New project`，填写：
   - Project name：`linux-practice-site`
   - Database password：生成强密码并保存好
   - Region：选离主要使用者较近的区域
   - Plan：个人练习用 Free 即可
3. 项目创建完成后，在 `Project Settings → API`（或 Connect 页）记下：
   - **Project URL**，形如 `https://abcdefghijkl.supabase.co`
   - **Publishable key**，形如 `sb_publishable_...`

> Publishable key 可以出现在前端代码里，前提是 RLS 已正确配置。
> 绝对不要把 `secret` key 或旧版 `service_role` key 放进网页。

免费项目长时间低活动可能被暂停，到控制台恢复即可。

## 二、创建进度数据表

`SQL Editor → New query`，整段执行：

```sql
create table public.progress_records (
  user_id uuid not null
    references auth.users(id) on delete cascade,

  qid text not null
    check (char_length(qid) between 1 and 32),

  bank_version text not null default '',
  selected text[] not null default '{}',
  correct boolean not null default false,

  answered_at bigint not null default 0
    check (answered_at >= 0),

  attempts integer not null default 0
    check (attempts >= 0),

  wrong_count integer not null default 0
    check (wrong_count >= 0),

  favorite boolean not null default false,
  favorite_updated_at bigint not null default 0
    check (favorite_updated_at >= 0),

  needs_review boolean not null default false,
  review_updated_at bigint not null default 0
    check (review_updated_at >= 0),

  updated_at timestamptz not null default now(),

  primary key (user_id, qid)
);

create or replace function public.touch_progress_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger progress_records_touch_updated_at
before update on public.progress_records
for each row
execute function public.touch_progress_updated_at();

alter table public.progress_records enable row level security;

revoke all on table public.progress_records from anon, authenticated;
grant select, insert, update, delete on table public.progress_records to authenticated;

create policy "progress_select_own"
on public.progress_records for select to authenticated
using ((select auth.uid()) = user_id);

create policy "progress_insert_own"
on public.progress_records for insert to authenticated
with check ((select auth.uid()) = user_id);

create policy "progress_update_own"
on public.progress_records for update to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "progress_delete_own"
on public.progress_records for delete to authenticated
using ((select auth.uid()) = user_id);
```

RLS 是这里最关键的一环：

- 未登录（`anon`）完全不能读写这张表。
- 登录用户只能看到、只能改 `user_id` 等于自己账号 ID 的行。
- 即使有人从网页源码里拿到 Project URL 和 Publishable key，也读不到别人的数据。

如果查询报「表没有暴露给 Data API」，去 `Project Settings → API / Data API Settings` 确认 `public` schema 已启用。

## 三、配置 GitHub 登录

### 1. 复制 Supabase 回调地址

`Authentication → Sign In / Providers → GitHub`，页面上会显示 Callback URL，形如：

```text
https://abcdefghijkl.supabase.co/auth/v1/callback
```

### 2. 创建 GitHub OAuth App

GitHub：`头像 → Settings → Developer settings → OAuth Apps → New OAuth App`

```text
Application name:          Linux Practice Site
Homepage URL:              https://nyatskr.github.io/linux-practice-site/
Authorization callback URL: https://abcdefghijkl.supabase.co/auth/v1/callback
```

注意：GitHub 里的 callback 填 **Supabase 的地址**，不是 GitHub Pages 地址。

创建后复制 `Client ID`，点 `Generate a new client secret` 生成并复制 `Client secret`。

### 3. 填回 Supabase

`Authentication → Sign In / Providers → GitHub`：打开 Provider，填 Client ID 与 Client Secret，Save。

Client Secret 只放在 Supabase 控制台，不进仓库、不发给任何人。

## 四、配置允许跳转的网址

`Authentication → URL Configuration`：

```text
Site URL:
https://nyatskr.github.io/linux-practice-site/

Redirect URLs:
https://nyatskr.github.io/linux-practice-site/?auth=callback
http://127.0.0.1:8848/?auth=callback
http://localhost:8848/?auth=callback
```

生产环境用精确网址，不要开过宽的通配符。

## 五、填入前端配置

编辑 `assets/js/cloud-config.js`：

```javascript
window.LP_CLOUD_CONFIG = Object.freeze({
  url: 'https://abcdefghijkl.supabase.co',
  publishableKey: 'sb_publishable_xxxxxxxxxxxxx',
});
```

两行都留空时，站点按纯本地模式运行，页面上「云同步」会显示「未启用」。

`index.html` 已经引入所需脚本，无需再改：

```html
<script src="assets/vendor/supabase-js-2.118.0.js"></script>
<script src="assets/js/cloud-config.js"></script>
<script src="assets/js/cloud.js"></script>
<script src="assets/js/app.js"></script>
```

## 五之二、SDK 自托管（vendor）

Supabase SDK **不走 CDN**，文件在仓库里：

| 项 | 值 |
| --- | --- |
| 版本 | `@supabase/supabase-js@2.118.0`（UMD 构建 `dist/umd/supabase.js`） |
| 来源 | npm registry：`https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-2.118.0.tgz` |
| 下载日期 | 2026-10-27 |
| 文件 | `assets/vendor/supabase-js-2.118.0.js`（218 KB，未压缩） |
| 许可证 | MIT，见 `assets/vendor/supabase-js-LICENSE.txt` |
| SHA-256 | `ee3be8de192b97cb1d73d1e95d6b82bb1f6b658c0f97c4ef757fc331996ed3d3` |

**为什么自托管**：SDK 是可选功能，但它是阻塞脚本。挂在 CDN 上时，CDN 慢或被墙，
整个应用（不只是云同步）都会卡在启动阶段。自托管后只要站点能打开，SDK 就能加载，
也少一次第三方 DNS/TLS 往返。ICT 站也放了同一份文件，两个仓库各自独立，互不引用。

**为什么钉死版本**：`@2` 是浮动标签，会在不改仓库的情况下自动升到新的 2.x。
钉死后升级是可审计的动作。

升级步骤：

```powershell
# 1. 改版本号，下载同一份 tarball
curl.exe -L -o sb.tgz https://registry.npmjs.org/@supabase/supabase-js/-/supabase-js-<新版本>.tgz
tar -xzf sb.tgz
# 2. 替换 vendor 文件与许可证
copy package\dist\umd\supabase.js assets\vendor\supabase-js-<新版本>.js
copy package\LICENSE assets\vendor\supabase-js-LICENSE.txt
# 3. 记下新的 SHA-256，更新 index.html 与本文件
Get-FileHash assets\vendor\supabase-js-<新版本>.js -Algorithm SHA256
# 4. 跑回归
node tools/test-boot-without-cdn.mjs
```

`tools/test-boot-without-cdn.mjs` 会屏蔽 `cdn.jsdelivr.net` 后启动站点，
校验题库、路由、SDK、云状态与控制台错误，并断言页面没有向 CDN 发请求。
**如果有人把 SDK 改回 CDN 引入，这条测试会直接失败。**

登录流程用 PKCE（`flowType: 'pkce'`）。站点用 `#/practice` 这类 URL 片段做路由，传统隐式登录也会把令牌放进 `#` 后面，容易和路由冲突；PKCE 把授权码放在查询参数里，更适合现在的结构。

## 六、上线前自测

1. 先在「进度与数据」导出当前 JSON 备份。
2. 用 `http://127.0.0.1:8848/` 本地打开（不能双击 `index.html` 测 OAuth）。
3. 点「使用 GitHub 登录并同步」，确认跳回本站且地址栏里的 `?auth=callback&code=...` 已被清理。
4. 在 Supabase `Table Editor` 里确认出现记录。
5. 设备 A 答一题，等状态变成「已同步 时:分」。
6. 设备 B 登录同一账号，确认题目状态出现。
7. 设备 B 取消收藏，设备 A 点「立即同步」，确认取消状态传回来。
8. 断网答题，再联网，确认自动补同步。
9. 换另一个 GitHub 账号登录，确认看不到第一个账号的数据。
10. 退出登录，确认本机练习仍正常。
11. JSON 导出、导入仍有效。

## 常见报错

| 现象 | 原因 |
| --- | --- |
| `redirect_uri_mismatch` | GitHub OAuth App 的 callback 填错，应填 Supabase callback |
| 登录后跳回 localhost | Supabase 的 Site URL / Redirect URLs 没配正式网址 |
| `row violates row-level security policy` | 上传的 `user_id` 不是当前登录用户，或会话尚未建立 |
| 登录成功但读不到数据 | 表权限、RLS、Data API 是否暴露 `public` schema |
| `relation "progress_records" does not exist` | 建表 SQL 没执行，或执行到了别的 schema |
| 云端清空后记录又回来 | 其他设备仍持有旧本地记录并重新上传；先在那些设备退出登录或清空本机缓存 |
| 状态一直是「离线」 | 浏览器 `navigator.onLine` 为 false，或请求被拦截 |

## 数据结构与合并规则

一题一行，主键 `(user_id, qid)`。

| 本地字段 | 数据库字段 | 合并规则 |
| --- | --- | --- |
| `qid` | `qid` | 与 `user_id` 组成唯一键 |
| `selected` | `selected` | 保留最近一次作答 |
| `correct` | `correct` | 保留最近一次作答 |
| `answeredAt` | `answered_at` | 时间较新的优先 |
| `attempts` | `attempts` | 两边取较大值 |
| `wrongCount` | `wrong_count` | 两边取较大值 |
| `favorite` | `favorite` | 由 `favoriteUpdatedAt` / `favorite_updated_at` 较新的一边决定 |
| `needsReview` | `needs_review` | 由 `reviewUpdatedAt` / `review_updated_at` 较新的一边决定 |

`favoriteUpdatedAt` / `reviewUpdatedAt` 是为云同步新增的字段：没有它们，「在 A 设备收藏、在 B 设备取消收藏」会被 `favorite = favorite || rec.favorite` 的旧规则合并回「已收藏」。

同步顺序固定为：拉取云端 → 按 `qid` 合并到本机 → 写回本机 → `upsert` 回云端。上传用 `onConflict: 'user_id,qid'`，按 200 行分批。

## 本机存储键

| 键 | 内容 |
| --- | --- |
| `lp.progress.v1.guest` | 未登录时的记录 |
| `lp.progress.v1.user.<uuid>` | 登录后该账号的记录 |
| `lp.progress.v1` | 升级前的旧键，首次加载会自动复制到 `.guest`，原键保留不删 |
| `lp.session.v1` | 正在进行的练习（本机） |
| `lp.prefs.v1` | 综合练习偏好（本机） |
| `lp.migrated.<uuid>` | 该账号已处理过「本机记录合并」提示 |

登录后改用账号专属键，是为了避免「先登录 A 再换 B」时把 A 的记录合并进 B。

## 相关文件

| 文件 | 职责 |
| --- | --- |
| `assets/js/cloud-config.js` | Project URL 与 Publishable key |
| `assets/js/cloud.js` | 登录、拉取合并上传、状态机、离线重试、清空云端 |
| `assets/js/core.js` | 进度存储作用域、记录字段、`mergeInto` 合并规则 |
| `assets/js/views.js` | 「进度与数据」页的云同步卡片 |
| `assets/js/app.js` | 登录/同步/退出/清空动作、迁移提示弹层 |
