var fs = require("fs");
//文件件
const  getAllDirctory =function(callback){
    fs.readdir("./uploads",function(err,files){
        if(err){
            throw  err;
        }
        var  allAlbums =[];
        (function iterator(i){
            if(i==files.length){
                //异步处理
                callback(allAlbums);
                return;
            }
            //读取文件件
            fs.stat("./uploads/"+files[i],function(err,stats){
                //错误的时候 退出
                if(err){
                    throw err;
                }
                //是否为文件件
                if(stats.isDirectory()){
                    allAlbums.push({
                        fileName:files[i]
                    });
                    iterator(i+1);
                }
            });
        })(0);
    });
};
//文件名字
const  getIamges=function(fileName,callback){
        fs.readdir("./uploads/"+fileName,function(err,files){
            if(err){
                callback("没有此文件夹",null);
                return;
            }
            var imagesArr =[];
            (function iterator(i){
                if(i==files.length){
                    //异步处理
                    callback(null,imagesArr);
                    return;
                }
                //读取文件件
                fs.stat("./uploads/"+fileName+"/"+files[i],function(err,stats){
                    //错误的时候 退出
                    if(err){
                        callback("没有此文件夹",null);
                        return;
                    }
                    //是否为文件件
                    if(stats.isFile()){
                        imagesArr.push({
                            name:files[i],
                            fileName:files[i].split(".")[0],
                            url:fileName+"/"+files[i]
                        });
                        iterator(i+1);
                    }
                });
            })(0);
        })
};
exports.getAllDirctory = getAllDirctory;
exports.getIamges = getIamges;
