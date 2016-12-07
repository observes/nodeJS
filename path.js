//path 路径模块，处理文件路径。
var path = require("path");

var f = "../abc.index";
//normalize 规范化路径
console.log(path.normalize(f));

//用于多个路径的连接。
console.log(path.join("E:\\WEB前端\\\NodeJs\\DAY03", "aaa.html"));

//将 to 参数解析为绝对路径。
console.log(path.resolve("./abc.html"));
console.log(path.resolve("E:\\WEB前端\\NodeJs", "../abc.html"));

//获取文件名
console.log(path.basename("a/b/c/xxx.html"));
//获取文件后缀
console.log(path.extname("a/b/c/xxx.html"));

//获取路径对象。
var o = path.parse("http://localhost:3000/home/index.php?username=ergou&pwd=123456#go");
//console.log(o);
//url 处理网络资源地址。(网址)  统一资源标识符
var url = require("url");
var o = url.parse("http://www.rename.cn/sssssssssss/a.htm?xxx=aaa");
console.log(o);
console.log(o.pathname); //获取用户想访问的文件地址。