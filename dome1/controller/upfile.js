var file = require("../models/file.js");
module.exports=function(req,res,next){
    file.getAllDirctory(function(albumArr){
        res.render('../views/form.ejs',{
            title:"表单上传",
            album:albumArr
        });
    });
};