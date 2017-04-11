var express = require('express');
var bodyParser = require('body-parser');
var app = express();
//静态资源处理
app.use(express.static('../public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("yes");
});
app.listen(9000,"127.0.0.1",function(err){
    if(err){
        throw err
    }
    console.log('listen to 9000');
});