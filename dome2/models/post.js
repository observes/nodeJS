var connectDB = require('./db.js');
var ObjectID = require("mongodb").ObjectID;
var settings = require("../settings.js");
var collectionName ='posts';
var Post =function(opts){
    this._init(opts);
};
module.exports =Post;
Post.prototype._init=function(opts){
        this.name =opts.name;
        this.title= opts.title;
        this.post=opts.post;
};
//存储文章
Post.prototype.save=function(callback){
    var date= new Date();
    var time={
        date:date,
        year:date.getFullYear(),
        month:date.getFullYear()+'-'+(date.getMonth()+1),
        day:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate(),
        minute:date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'-'+date.getMinutes()
    };
//文章信息：
    var article ={
        name:this.name,
        time:time,
        title:this.title,
        post:this.post
    };
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).insertOne(article,function(err,result){
            db.close();
            callback(err,result);
        })
    })
};
//获取文章
Post.get=function(name,callback){
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        var queryJson =name?{"name":name}:{};
        var result=[];
        var cursor = db.collection(collectionName).find(queryJson).sort({time:-1});
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
//根据文章Id查询
Post.getOneById = function(_id, callback) {
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).findOne({"_id": new ObjectID(_id)},function(err,doc){
            if(err){
                db.close();
                return callback(err);
            }
            callback(null,doc);
            db.close();
        })
    })
};
