var connectDB = require('./db.js');
var settings = require("../settings.js");
var collectionName ='users';
function User(user){
    this._init(user);
}
module.exports =User;
//初始化
User.prototype._init=function(user){
    this.name =user.name;
    this.password=user.password;
    this.email =user.email;
};
//储存用户信息
User.prototype.save =function(callback){
    //用户信息
    var user ={
        name:this.name,
        password:this.password,
        email:this.email
    };
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).insertOne( user,function(err,result){
            db.close();
            callback(err,result);
        })
    });
};
//获取用户信息
User.get =function(name,callback){
    connectDB(settings.db,function(err,db){
        if(err){
            return  callback(err);
        }
        var result=[];
        var cursor = db.collection(collectionName).find({
            'name':name
        });
        cursor.each(function(err,doc){
            if(doc!=null){
                result.push(doc);
            }else {
                callback(null,result);
                db.close();
            }
        })
    })
};
