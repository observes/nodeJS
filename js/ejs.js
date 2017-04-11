var http =require("http");
var ejs = require("ejs");
var fs = require('fs');
var data={
    y:2017,
    m:8,
    d:7
};
var server = http.createServer(function(req,res){
    "use strict";
    if(req.url=='/'&&req.method.toLocaleLowerCase()=='get'){
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
        fs.readFile('../views/index.ejs',function(err,dataBuffer){
            if(!err) {
                //console.log(dataBuffer);
                res.end(ejs.render(dataBuffer.toString(),data))
            }else {
                throw  err
            }
        })
    }
});
const  PORT =9000;
server.listen(PORT,'127.0.0.1',function(){
    "use strict";
    console.log('listen port :'+PORT)
});