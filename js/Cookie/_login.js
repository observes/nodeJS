var db= require('../mongo/db.js');
var md5 = require('../md5/md5.js');
var session = require('express-session');
var express =require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app =express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set("views",path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.get('/',function(req,res){
    if(req.session.login){
        res.send("欢迎"+req.session.username)
    }else {
        res.send('未登录  <a href="/login">去登陆</a>');
    }
});
app.get('/login',function(req,res){
    res.render('login');
});
app.post('/checkLogin',function(req,res){
    db.findDB("use",'use',{"username":req.body.username},function(err,results){
        if(err){
            throw err;
        }
        console.log(results[0]);
        console.log(req.body.psd);
        if(results[0].psd==md5(req.body.psd)){
            req.session.login=true;
            req.session.username=results[0].username;
            res.redirect('/');
        }else{
            res.send("0");
        }
    });
});
app.listen(3000,function(err){
    if(err){
        throw  err;
    }
    console.log("listen 3000")
});


