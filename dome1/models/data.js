var request = require('request');
module.exports =function(url,method,data,callback){
    request({
        url: url,
        method: method,
        body: data
    }, function(error, response, body) {
        var data =JSON.parse(body);
        if (!error && response.statusCode == 200) {
            if(!data.code){
                callback(null,data.data)
            }else {
              callback(data.description,null)
            }
        }else  {
            callback(data.description,null)
        }
    });
};