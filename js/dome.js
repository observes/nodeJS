var http =require("http");
var URL = require('url');
var db= require("./mongo/db.js");
var server = http.createServer(function(req,res){
    if(req.url == '/'&&req.method.toUpperCase()=='GET'){
       db.insertOne('node','Mynode',{
           "name":'node_test',
           'age':11
       },function(err,result){
           if(err){
               throw  err;
           }
           res.end('result');
       })
    }
    if(req.url == '/find'&&req.method.toUpperCase()=='GET'){
        db.findDB('node','Mynode',{'age':{$lt:20}},function(err,result){
            if(err){
                throw err;
            }
            res.end(JSON.stringify(result));
        })
    }
    //  get 请求分页的URl /page?pageNum=2&activePage=1
    if(req.method.toUpperCase()=='GET'&& /\/page/g.test(req.url)){
        var params = URL.parse(req.url, true).query;
        var pageNum =params['pageNum'];
        var active=params.activrPage;
        db.findPage('node','node',pageNum,active,function(err,result){
            if(err){
                throw err;
            }
            res.end(JSON.stringify(result));
        });
    }
    if(req.method.toUpperCase()=='GET'&&req.url=='/remove'){
        db.removeDB('node','node',{'age':{$gt:50}},function(err,results){
            if(err){
                throw err;
            }
            res.end(JSON.stringify(results));
        })
    }
    if (req.method.toUpperCase()=='GET'&&req.url=='/upData'){
            db.update("node",'node',{"age":45},{
                            'data':new Date().toString()
            },function(err,results){
                if(err){
                    throw  err;
                }
                res.end(JSON.stringify(results));
            })
    }
});

const  PORT =3000;
server.listen(PORT,'127.0.0.1',function(){
    "use strict";
    console.log('listen port :'+PORT)
});


