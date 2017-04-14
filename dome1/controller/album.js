var file = require("../models/file.js");
module.exports =function(req,res,next){
        var albumName=req.params["album"];
        file.getIamges(albumName,function(err,imagesArr){
                if(err){
                        res.send(err);
                }else {
                        //console.log(imagesArr);
                        res.render("../views/ablum.ejs",{
                                title:albumName,
                                name:albumName,
                                album:imagesArr,
                                active:1
                        });
                }
        });
};