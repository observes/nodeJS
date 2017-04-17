var connectDB = require('./db.js');
var ObjectID = require("mongodb").ObjectID;
var settings = require("../settings.js");
var collectionName ='posts';
var Comment =function(_id,commennt){
        this.id=_id;
        this.comment=commennt;
};
module.exports =Comment;
Comment.prototype.save=function(callback){
    var _this =this;
    connectDB(settings.db,function(err,db){
        if(err){
            db.close();
            return callback(err);
        }
        db.collection(collectionName).update({"_id": new ObjectID(_this.id)},{$push:{comments:_this.comment}},function(err, result){
            if(err){
                db.close();
                return callback(err);
            }
            callback(null,result);
            db.close();
        })
    });
};