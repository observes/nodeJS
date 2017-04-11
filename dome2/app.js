var express =require("express");
var routes=require("./routes/index");
var settings = require('./settings.js');
var flash = require('connect-flash');
var http =require("http");
var  path =require("path");
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var MongoStore = require("connect-mongo")(session);
var app = express();
//中间件
app.set("port",process.env.POTR||9000);//  设置端口
app.set("views",path.join(__dirname,'views')); // 设置试视图文件的目录
app.set("view engine","ejs");// 设置视图模板引擎Ejs
app.use(flash());
app.use(favicon(path.join(__dirname, 'public', 'bitbug_favicon.ico'))); // 使用默然的图标
app.use(logger('dev'));// 开发环境输出日志
// 协作处理POST请求
app.use(methodOverride());
// 解析请求体
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret:settings.cookieSecret,
    key:settings.db,
    resave: false,
    cookie:{maxAge:1000*60*60*24*30},//30天
    saveUninitialized: true
    , store:new MongoStore({
        url: settings.sessionUrl,
        ttl: 14 * 24 * 60 * 60 // = 14 days. Default
    })
}));
app.use(express.static(path.join(__dirname,'public'))); //静态文件处理
app.use(express.static(path.join(__dirname,'uploads'))); //静态文件处理
if('development'==app.get("env")){
    app.use(errorHandler()); //开发环境输出错误信息
}
routes(app);
http.createServer(app).listen(app.get("port"),function(){
    console.log('在监听端口：'+app.get('port'));
});