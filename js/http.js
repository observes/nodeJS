var http =require("http");
var request = require('request');

var server=http.createServer(function(req,res){
    "use strict";
    request({
        url: 'http://192.168.2.85:8080/api.do',
        method: "POST",
        body: '{"action": "teacherAction","method":"index"}'
    }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
            res.end(body);
        }else  {
            console.log(response);
            res.end(response.toString());
        }
    });
});
server.listen(8888,'127.0.0.1',function(){
    "use strict";
    console.log('listen to Port:8888');
});
