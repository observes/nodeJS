var express =require("express");
var app  = express();
var router = require("./controller/index.js");
var album = require("./controller/album.js");
var data= require("./controller/data.js");
var upfile =require("./controller/upfile.js");
var formUp=require("./controller/formUp.js");
//模板引擎
app.engine('.ejs',require('ejs').__express);
app.set("view engine" ,"ejs");
//中间件
app.use(express.static('./public'));
app.use(express.static('./uploads'));
app.get("/favicon.ico",function(req,res){
   res.send("5555");
});
//服务器交互
app.get("/web",data);
//首页
app.get("/",router);
//上传
app.use("/up",upfile);
//上传图片
app.post('/formUp',formUp);
//相册
app.use("/:album",album);
//404
app.use(function(req,res,next){
    res.status(400).send('没有权限访问')
});

//端口
app.listen(9000,"127.0.0.1",function(err){
   if(err){
       throw err;
   }
    console.log("listen to 9000");
});
