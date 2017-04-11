var session = require('express-session');
var express =require('express');
var app =express();
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.get('/',function(req,res){
    if(req.session.login){
            res.send("欢迎"+req.session.loginName)
    }else {
        res.send("未登录");
    }
});
app.get('/login',function(req,res){
        req.session.login=true;
        req.session.loginName="nodeJS";
        res.send("成功登陆")
});
 app.listen(3000,function(err){
    if(err){
         throw  err;
     }
     console.log("listen 3000")
 });