var settings = require("../settings.js");
var MongoClient = require('mongodb').MongoClient;
module.exports=function (docmentName,callback){
    var url =settings.location+docmentName;
    MongoClient.connect(url, function(err, db) {
        callback(err,db);
    });
};