var file = require("../models/file.js");
module.exports =function(req,res,next){
   file.getAllDirctory(function(albumArr){
       res.render("../views/index.ejs",{
           title:"相册首页",
           album:albumArr
       });
   })
};