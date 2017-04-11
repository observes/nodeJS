const crypto = require("crypto");
module.exports=function (oldPwd){
    var md5  =crypto.createHash('md5');
    var pwd = md5.update(oldPwd).digest("base64");
    return pwd;
};