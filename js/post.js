var http =require("http");
var fs  =require("fs");
var path =require("path");
var query =require("querystring");
var formidable = require('formidable');
var timestamp =  require('./timestamp');
var server = http.createServer(function(req,res){
    "use strict";
    //请求首页
    if(req.url=='/'&&req.method.toLocaleLowerCase()=='get'){
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
        fs.readFile('../views/index.html',function(err,data){//异步过程
            if(!err){
                res.end(data)
            }
        })
    }
    //post 提交表单
    if(req.url=='/login'&& req.method.toLocaleLowerCase()=='post'){ //post 请求
        res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
        var alldata='';
       // 读取传递表单开始
       req.addListener("data",function(chunk){
            alldata +=chunk
       });
        //读取表单参数结束
        req.addListener("end",function(){
            var dataJson = query.parse(alldata.toString());
            console.log(dataJson.usreName);
            res.end("5")
        });
    }
    //文件上传  formidable 表单处理
    if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
        var form = new formidable.IncomingForm();
        //上传地址
        form.uploadDir = '../uploads';
        //表单
        form.parse(req, function(err, fields, files) {
            //所以的文本域肯单选框 都在fields 存放
            //console.log(fields);
            //所以文件域全部放在files 存放
           // console.log(files);
            // 文件名字处理
            var oldPath =__dirname+'/'+ files.usreFile.path;
            var  extName =path.extname(files.usreFile.name);
            var newPath = '../uploads/'+timestamp()+extName;// 拓展名
            fs.rename(oldPath,newPath,function(err){
                if(!err){
                    res.writeHead(200, {'content-type': 'text/plain'});
                    res.end('成功');
                }else {
                     throw err
                }
            });
        });
    }
});
const  PORT =9000;
server.listen(PORT,'127.0.0.1',function(){
    "use strict";
    console.log('listen port :'+PORT)
});