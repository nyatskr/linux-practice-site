/* cloud-config.js — Supabase 连接配置
 *
 * 这里只放「可以公开」的信息：Project URL 与 Publishable key。
 * 它们会出现在网页源码里，属于正常现象；数据安全由数据库的 RLS 策略保证。
 *
 * 绝对不要把这个文件改成放 secret / service_role key —— 那等于把数据库密码写进网页。
 *
 * 填法见 docs/cloud-sync.md，两行都留空时网站按纯本地模式运行。
 */
window.LP_CLOUD_CONFIG = Object.freeze({
  // 例：https://abcdefghijklmnop.supabase.co
  url: 'https://mvrdlzjnhxzhqxszpcgi.supabase.co',
  // 例：sb_publishable_xxxxxxxxxxxxxxxxxxxxx
  publishableKey: 'sb_publishable_qHVLmszRej7auNOStAk1ZQ_GRP6rTDA',
});
