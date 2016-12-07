/**
 * JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。
 * 二进制可以存储电脑中任何数据（比如：一段文本、一张图片、一个硬盘，应该说电脑中所有的数据都是二进制。）
 */
//NodeJs是服务端在处理像TCP（网络）流或文件流时，必须使用到二进制数据。
// 因此在 "Node.js中"，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
//Buffer类类似于一个数组,但是必须在创建的时候就确定长度。

//Buffer创建,并且指定buffer的长度，长度
var buf1 = new Buffer(10);
console.log(buf1.toString());
//给定“数据数组”创建 Buffer 实例
var buf2 = new Buffer([97, 98, 99]);
console.log(buf2.toString());
//一个字符串来创建 Buffer 实例：
var buf3 = new Buffer("我是一个人");
console.log(buf3.toString());
//Buffer length长度单位为字节。 所以注意，该长度并不是文本的长度，而且文本存储在内存中字节数。 比如：“我”字符串长度为1，内存中3个字节。
var buf = new Buffer("你");
console.log(buf.length);
//写入内容到buffer中。
buf = new Buffer(9);
//write：写,从buffer的0位置开始。
/**
 *   string - 写入缓冲区的字符串。
     offset - 缓冲区开始写入的索引值，默认为 0 。
     length - 写入的字节数，默认为 buffer.length
     encoding - 使用的编码。默认为 'utf8' 。
 */
buf.write("我爱你");
buf.write("abc", 3); //“爱”占3个字节，abc也占3个字节，刚好替换到"爱"

buf.write("二狗狗,o(︶︿︶)o 唉");
console.log(buf.toString());

//buffer读取内容  .toString()
/**
 * 参数：
 参数描述如下：
     encoding - 使用的编码。默认为 'utf8' 。
     start - 指定开始读取的索引位置，默认为 0。
     end - 结束位置，默认为缓冲区的末尾。
 */
buf = new Buffer("前段时代");
console.log(buf.toString());
console.log(buf.toString("UTF-8"));
buf = new Buffer('{"name":"二狗"}');
//buffer解析为json.
console.log(JSON.parse(buf));
//buffer拷贝："拷贝一个Buffer的某一段"到操作对象中。
var source = new Buffer("明天休息"); //源buffer
var target = new Buffer(6); //目标buffer
//把source的内容拷贝到target中。
source.copy(target);
console.log(target.toString())