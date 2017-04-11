var MongoClient = require('mongodb').MongoClient;
var setings =require('./seting.js');
function  _connectDB(docmentName,callback){
    var url =setings.location+docmentName;
    MongoClient.connect(url, function(err, db) {
        callback(err,db);
    });
}
//插入数据
exports.insertOne =function(docmentName,collectionName,json,callback){
    _connectDB(docmentName,function(err,db){
        if(err){
            callback(err,null);
            return;
        }
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        })
    });
};
//查找所以数据
exports.findDB =function(docmentName,collectionName,json,callback){
    var _json=json||{};
    _connectDB(docmentName,function(err,db){
        if(err){
            callback(err,null);
            return;
        }
        var result=[];
        var cursor = db.collection(collectionName).find(_json);
        cursor.each(function(err,doc){
            if(doc!=null){
                result.push(doc);
            }else {
                callback(null,result);
                db.close();
            }
        })
    });
};
//分页查找
 exports.findPage=function(docmentName,collectionName,pageNum ,active,callback){
     _connectDB(docmentName,function(err,db){
         if(err){
             callback(err,null);
             return;
         }
         var result=[];
         var shipNum = parseInt(pageNum*(active-1));
         var limitNum = parseInt(pageNum);
         var cursor = db.collection(collectionName).find({}).skip(shipNum).limit(limitNum);
         cursor.each(function(err,doc){
             if(doc!=null){
                 result.push(doc);
             }else {
                 callback(null,result);
                 db.close();
             }
         })
     });
 };
//删除
exports.removeDB=function(docmentName,collectionName,json,callback){
    _connectDB(docmentName,function(err,db){
        if(err){
            callback(err,null);
            return;
        }
         db.collection(collectionName).deleteMany(json,function(err,results){
                if(err){
                    callback(err,null);
                    return;
                }
                callback(null,results);
                db.close();
         })
    });
};
//更新
exports.update=function(docmentName,collectionName,jsonOld,jsonNew,callback){
    _connectDB(docmentName,function(err,db){
        if(err){
            callback(err,null);
            return;
        }
        db.collection(collectionName).updateMany(jsonOld,jsonNew,function(err,results){
                if(err){
                    callback(err,null);
                    return;
                }
                callback(null,results);
                db.close();
        });
    });
};

