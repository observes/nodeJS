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
        post:this.post,
        comments:[],
        pv:0
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
Post.get=function(name,page,pageNum,callback){
    //每页显示多少条数据
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        var queryJson =name?{"name":name}:{};
        var result=[];
        var cursor = db.collection(collectionName).find(queryJson).skip((page-1)*pageNum).limit(pageNum).sort({time:-1});
        db.collection(collectionName).find(queryJson).count().then(function(count){
            cursor.each(function(err,doc){
                if(doc!=null){
                    result.push(doc);
                }else {
                    callback(null,result,count);
                    db.close();
                }
            })
        });
    })
};
//根据文章Id查询
Post.getOneById = function(_id, callback) {
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).update({"_id": new ObjectID(_id)},{$inc:{"pv":1}},function(err,res){
                if(err){
                    db.close();
                    return callback(err);
                }
                db.collection(collectionName).findOne({"_id": new ObjectID(_id)},function(err,doc){
                    if(err){
                        db.close();
                        return callback(err);
                    };
                    callback(null,doc);
                    db.close();
                })
        });
    })
};
//更新文章
Post.update=function(_id,json,callback){
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).updateOne({"_id": new ObjectID(_id)},json,function(err, result){
            if(err){
                db.close();
                return callback(err);
            }
            callback(null,result);
            db.close();
        })
    });
};
//删除文章
Post.remove=function(_id,callback){
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).deleteOne({"_id": new ObjectID(_id)},function(err, result){
            if(err){
                db.close();
                return callback(err);
            }
            callback(null,result);
            db.close();
        })
    });
};
//搜索
Post.search =function(key,callback){
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).find({"title": new RegExp('^.*'+key+".*$",'i')}).sort({time:-1}).toArray(function(err, doc){
            if(err){
                db.close();
                return callback(err);
            }
            callback(null,doc);
            db.close();
        })
    });
};