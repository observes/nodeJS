var http = require('http');
var fs= require('fs');
var url =require("url");
//创建服务
var server =http.createServer(function(req,res){
    "use strict";
    if(req.url==='/'){
        fs.readFile('./views/test.html',function(err,data){
            if(!err){
                res.writeHead(200,{
                    'Content-type':'text/html;charset=UTF-8'
                });
                res.end(data);
            }else {
                console.log(err);
                res.writeHead(404);
            }
        });
    }else if(req.url==='/img/DMMban.png'){
        fs.readFile("./img/DMMban.png",function(err,data){
            res.writeHead(200,{
                'Content-type':'image/png;charset=UTF-8'
            });
                res.end(data);
        });
    }else if(req.url==='/css/dome.css'){
        fs.readFile("./css/dome.css",function(err,data){
            res.writeHead(200,{
                'Content-type':'text/css;charset=UTF-8'
            });
            res.end(data);
        });
    }else {
        res.writeHead(404,{
            'Content-type':'text/html;charset=UTF-8'
        });
        res.end()
    }
});
//运行服务器
server.listen(8888,'127.0.0.1',function(){
    "use strict";
    console.log('listen to Port:8888');
});
