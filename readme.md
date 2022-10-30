# Onion 的LAN 软件
## ELECTRON打包exe
开源协议：<b>Mozilla Public License 2.0<b>
## 用法：
1. Windows exe小窗口：ctrl+S 保存文本，ctrl+G 刷新文本 ; 网页端：ctrl+S 保存，ctrl + R 刷新文本 ;手机端：双击二维码即可保存文本
2. 关于文件传输，桌面端点击二维码，即可打开网页传输，手机端扫码即可！<font color='red'> 注意 </font>：必须在同一个WiFi(局域网可通信网段)下
3. 配置文件在resources,可以打开找到uploadFiles文件夹自行建立快捷方式到桌面，emm因为确实不会建立相对路径的快捷方式，查了好久，只找到VBS的bat方法
## 关于：
1. 项目基于Node.js环境的JavaScript前后端实现,前端当然只是普通的前端...
2. 项目基于GitHub开发的的electron@21.1.0 node_modules实现
3. Vscode,Team,utools,Hyper,Slack,Atom,支付宝蚂蚁小程序，等许多应用都是基于electron实现的,electron并不冷门
4. 因为chromev8的缘故，electron速度非常快，相对的代价就是内存占用较高

### ~~什么？有BUG？ Sorry啊, 就是不修！~~

## Nodejs启用
先安装依赖包，后启用app.js
```
npm i
node app.js
```
浏览器打开IP：端口




-------------------
更新日志：  
v1.0.0-v1.2.2  
demo版本  
v1.2.3
修复手机端bug  
v1.3.3  
增加保存,刷新提示
v1.4.3
1. 移除win端移动二维码，改为自适应，提升窗口适配能力
2. 更改jQuery 为本地源,不依赖用户网络环境

v1.4.4
修复端口问题

-------------------

Author：Bigonion  
eMail：a454888395@gmail.com

