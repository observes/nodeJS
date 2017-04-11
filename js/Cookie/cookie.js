var express =require('express');
var cookieParser = require('cookie-parser');
var app = express ();
app.use(cookieParser());
app.get('/',function(req,res,next){
    res.cookie('test', '666', { expires: new Date(Date.now() + 900000), httpOnly: true });
    res.json(req.cookies);
});
app.post("");
app.listen(3000);
