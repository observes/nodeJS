// RESTful 路由设计
var express =require('express');
var fs =require("fs");
var bodyParser = require('body-parser');
var app =express();


//模板文件地址
/*app.set("views","ejs");*/
//模板引擎
app.set("view engine",'ejs');
//中间件 --静态文件处理
/*app.use(function(req,res,next){
    console.log("../public"+req.originalUrl);
    fs.readFile("../public"+req.originalUrl,function(err,data){
        if(err){
            next();
            return;
        }else {
            console.log(data.toString());
            res.send(data.toString());
        }
    });
});*/
//静态资源处理
app.use(express.static('../public'));
// post 参数处理请求处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//请求地址处理
app.get('/test',function(req,res){
    res.render("../../views/01.ejs",{
        title:"test",
        news:["sag","sjsj","sjsjg"]
    })
});
app.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log(req.body);
    res.end("User name:"+user_name+", password:"+password);
});
//得到请求后面的参数形式
app.get(/\/app\/([\d]{6})/,function(req,res){
    res.send(req.params[0])
});
app.get('/test/:id',function(req,res){
    res.send(req.params.id)
});
app.use('/admin',function(req,res,next){
    console.log(req.originalUrl);// /admin/mmm/ggg
    console.log(req.baseUrl); //  /admin
    console.log(req.path); //  /mmm/ggg
    res.end("aaaa");
});
//404 页面
app.use("/",function(req,res,next){
    res.status(404).render("../../views/404.ejs");
});
app.listen(9000,"127.0.0.1",function(err){
    if(err){
        throw err
    }
    console.log('listen to 9000')
});