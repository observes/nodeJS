var ajaxData =require('../models/data.js');
module.exports =function(req,res,next){
    ajaxData('http://192.168.2.85:8080/api.do',"POST",'{"action": "teacherAction","method":"index"}',function(err,data){
        console.log(data);
        if (err){
            res.send(err)
        }else {
           res.render("../views/data.ejs",{
                data:data,
                 active:2
               }
           );
        }
    });
};
