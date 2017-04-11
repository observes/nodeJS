var http = require('http');
var fs= require('fs');
var url =require("url");
var server = http.createServer(function(req,res){
    "use strict";
   // console.log('pathname',url.parse(req.url).pathname);//访问地址
    //console.log('query',url.parse(req.url,true).query);// 查询参数 转化成为对象参
    var  name = url.parse(req.url,true).query.name;
    var  age = url.parse(req.url,true).query.age;
    var  sex = url.parse(req.url,true).query.sex;
    res.end('服务器收到请求'+name+age+sex);
});
server.listen(3000,"127.0.0.1");