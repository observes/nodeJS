const  timestamp =function(){
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear()  + month  + strDate+ date.getHours() + date.getMinutes()+ date.getSeconds();
    return currentdate;
};
module.exports = timestamp;