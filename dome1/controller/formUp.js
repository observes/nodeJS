var formidable = require('formidable');
var path = require("path");
var fs =require('fs');
var timestamp = require("./MathRoad.js");
module.exports=function(req,res,next){
    var form = new formidable.IncomingForm();
    //上传地址
    form.uploadDir =path.normalize(__dirname +'/../tempup/');
    // 文件处理
    form.parse(req, function(err, fields, files) {
        //console.log(files.fileImg);
        if(!files.fileImg.size){
            res.send('选择文件');
            return;
        }
        //错误的时候
        //console.log(fields.fileName);
        //console.log(files.fileImg.size);
        if(err){
            next();
            return;
        }
        var oldpath=files.fileImg.path;
        var  extName =path.extname(files.fileImg.name);
        var newpath=path.normalize(__dirname +'/../uploads/'+fields.fileName+'/'+files.fileImg.name.split(".")[0]+timestamp()+extName);
        fs.rename(oldpath,newpath,function(err){
            if(err){
                res.send('上传失败')
            }
            //res.send("成功")
            res.redirect("/"+fields.fileName);
        })
    });
};
