流水宴 · 两个 GitHub 仓库 + Supabase 全套包
==============================================

1. 进入 GitHub 仓库：
   LucasLi1337Unknown/LiuShuiYan--Peace-and-Tranquility

2. 打开 01-ACTUAL-WEBSITE 文件夹，把里面的所有内容上传到仓库根目录。
   请选择覆盖同名文件。不要把 01-ACTUAL-WEBSITE 这个外层文件夹本身上传进去。

3. 进入 Secrets-x7q2... 后台仓库。

4. 打开 02-SECRET-DASHBOARD 文件夹，把里面的三个文件上传到后台仓库根目录：
   liushui-console-7c9f.html
   config.js
   .nojekyll

5. 打开 Supabase 的 SQL Editor。

6. 打开 03-SUPABASE/setup.sql，复制全部内容，粘贴到 SQL Editor 并点击 Run。

7. 等待两个 GitHub Pages 部署完成。

8. 测试：
   - 用无痕窗口进入实际官网并提交 lucas-test@example.com。
   - 打开秘密后台并点击“刷新名单”。
   - 后台显示“云端名单”和测试邮箱即为成功。
   - 在实际官网提交一条评价，再用另一个浏览器刷新；评价仍然出现即为云端评价成功。
   - 预订区显示“云端实时”，不同设备看到相同人数即为云端预订成功。

重要：
- 两个仓库的 config.js 已经填写同一个 Supabase 项目。
- 绝对不要把 Supabase secret/service_role key 放进 GitHub。
- 隐藏链接不等于真正私密；不要用它收集敏感资料。
