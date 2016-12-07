//fs（file system）(NodeJs 文件系统系统文件)
var fs = require("fs");
//NodeJs 模块中的方法很多都有异步和同步版本(方法名以Sync)，
// 例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
//同步读取文件内容
var content = fs.readFileSync("./hello.html");
//console.log(content.toString());

//异步读取文件内容
fs.readFile("./hello.html", function(err, data) {
    //console.log(data.toString());
});

//读取文件的信息
fs.stat("/NodeJs//NodeJs.docx", function(err, data) {
    //获取文件大小（kb）。
    console.log(Math.ceil(data.size / 1024));
    //获取创建时间
    console.log(data.birthtime);
    //判断是否是目录
    console.log(data.isDirectory());
    //判断是否是文件
    console.log(data.isFile());
});
//fs写文件 writeFile(path,data,options,callback)
/**
     参数
     参数使用说明如下：
     path - 文件路径。
     data - 要写入文件的数据，可以是 String(字符串) 或 Buffer(流) 对象。
     options - 该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
     callback - 回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。
 */
fs.writeFile("幸福.txt", "日日写代码，夜夜写代码", function(err) {
    if (!err) {
        console.log("写入成功");
    }
});
//通过readFile和writeFile完成copy;   copy : 先获取源文件的内容，然写入到目标文件中。
fs.readFile("./hello.html", function(err, data) {
    //data 源文件的内容
    fs.writeFile("./hello.html-bak", data, function(err) {
        if (!err) {
            console.log("拷贝成功");
        }
    });
});
// fs删除文 fs.unlink(path, callback) 
fs.unlink("./aaa.xxx", function(err) {
    if (!err) {
        console.log("删除成功");
    } else {
        console.log("删除失败：" + err);
    }
});
// 删除空文件夹  fs.rmdir(path, callback)
fs.rmdir("./aaaa", function(err) {
    if (!err) {
        console.log("文件夹删除成功");
    } else {
        console.log("文件夹删除失败:" + err);
    }
});
// fs获取"目录中"的文件(夹)列表   fs.readdir(path,callback)
fs.readdir("./a", function(err, files) {
    //files 目录中所有文件和文件夹的名字。
    if (!err) {
        //console.log(files);
    }
});
//删除一个非空的文件夹(递归)
function delDir(dirPath) {
    //删除目录，必须先删除目录中所有内容（文件和文件夹）。
    //获取目录下面的所有内容。
    var files = fs.readdirSync(dirPath);

    //遍历文件列表
    for (var i = 0; i < files.length; i++) {
        //文件名
        var file = files[i];
        //拼接路径（目录路径+文件名）
        var path = dirPath + "/" + file;

        //获取path对应文件信息对象
        var stat = fs.statSync(path);
        //通过文件信息对象判断是否是有一个文件
        if (stat.isFile()) { //文件
            fs.unlinkSync(path);
        } else { //文件夹
            delDir(path);
        }
    }

    //删除文件夹
    fs.rmdirSync(dirPath);
}
/*------------------------------------------文件流的方式--------------------------*/
/*
（ 同步异步的方式）
readFile方法或readFileSync读文件,或writeFile方法或writeFileSync方法写入文件内容时
NodeJs首先将该文件内容完整地读入到缓存区(内存)，然后一次性将缓存区中内容写入到文件中。
小文件没有问题，因为占用内存小，如果一个文件很大，那么就可能让你的内存爆炸。
   流是字节数据的传输方式
   流分为两种：
        输入流：从某个地方读数据。
        输出流：把数据写到某个地方去
*/
/*----------------------------------管道方式---------------------------------------*/
//管道(pipe)提供了一个"输入流"到"输出流"的机制。

// 创建一个可读流（输入流）
var readStream = fs.createReadStream('./NodeJs.txt');
// 创建一个可写流（输出流）
var writeStream = fs.createWriteStream('./NodeJs2.txt');
//建立“流管道（pipe）” ,把readStream数据写入到writeStream中。
readStream.pipe(writeStream);
/*----------------------------管道流任务---------------------------------------*/
//zlib 压缩模块 (zip,rar)
var zlib = require("zlib");
// 创建一个可读流（输入流）
var readStream = fs.createReadStream('./NodeJs.txt');
//创建一个压缩流
readStream.pipe(zlib.createGzip()).pipe(fs.createWriteStream("./NodeJs.zip"));