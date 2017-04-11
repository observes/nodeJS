var http =require("http");
var server = http.createServer(function(req,res){
    "use strict";
    var resUrl = req.url;
    res.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
    if(resUrl.substr(0,9)==='/student/'){
        var studentId = resUrl.substr(9);
        console.log(resUrl.substr(10));
        if(/\d{10}/.test(studentId)){
            res.end('查询学生Id为'+studentId)
        }else {
            res.end('查询学生错误')
        }
    }else if(resUrl.substr(0,9)==='/teacher/'){
        var teacherId = resUrl.substr(9);
        if(/\d{10}/.test(teacherId)){
            res.end('查询老师Id为'+teacherId)
        }else {
            res.end('查询老师错误')
        }
    }else {
            res.end('其他信息 。。。。。。。')
    }
});
const  PORT =9000;
server.listen(PORT,'127.0.0.1',function(){
    "use strict";
    console.log('listen port :'+PORT)
});