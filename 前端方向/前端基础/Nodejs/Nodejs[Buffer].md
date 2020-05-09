## Buffer

Buffer 的单元素为 8 个 Bit 位的 Byte，所以可存储无符号整数 0-255

#### Buffer 与字符串

使用字符串创建 Buffer

```javascript
new Buffer("HelloBuffer", "UTF-8");
```

Tisp:如果给 Buffer 成员赋值一个不属于 0-255 之间的值，会有如下特性：如果赋值的值小于 0 则会累加 256 直到值处于 0-256 之间，如果大于 256 则采用累减，直到值处于 0-256 之间

Tips2：Buffer 分配的大小规则，以 8Kb 为限，小于 8Kb 的使用现有单元进行分配，定义为小对象，大于 8Kb 的使用整段分配的内存进行分配，定义为大对象

#### Buffer 与字符串互转

字符串转 Buffer,默认支持的编码类型：ASCII、UTF-8、UTF-16LE/UCS-2、Base64、Binary、Hex

```javascript
const buf = new Buffer("你好Buffer", "UTF-8");
// toString([encoding],[start],[end])
console.log(buf.toString("UTF-8", 0, 10));
```

对于不支持的编码类型，解决方案有：iconv（C++库实现）、iconv-lite（纯 JavaScript）

#### 分段读取时字符串边界乱码问题

1、设置流的编码格式(内部设置了 Decoder 对流进行了处理，边界的时候会检测是否是宽字符，如果发现边界存在宽字符，则会对两次区块数据的边界数据进行合并，从而解决边界乱码问题)

```javascript
const rs = new fs.createReadStram("test.md");
rs.setEncoding("utf8");
```

Tips：仅针对 UTF-8、Base64、UCS-2/UTF-16LE 这三种编码起作用

2、正确拼接数据段，然后整体 toString

```javascript
// 引入解码库
const iconv = require('iconv-lite')
const chunks = [];
const len = 0;
// 分段读取数据
res.on("data", chunk => {
  chunks.push(chunk);
  // 累加长度
  size+=chunk.length;
});
res.on("end",()=>{
  // 合并区块数据
  const buf = Buffer.concat(chunks,len);
  // 使用解码库进行字符串解码
  const str = iconv.decode(buf,'utf8')
  console.log(str)
})
```

#### Buffer与性能问题

在高并发下，如果可以对字符串等数据提前进行二进制编码的话，可以大幅度提高性能，因此在服务端返回固定格式的字符串或者大量固定格式文本时，可以提前使用Buffer进行转码然后留存，在请求到来时直接返回Buffer二进制数据，将会大幅度提高性能

#### 文件读取时的优化

在创建文件读取流对象时，可以指定读取的单个区块大小

    fs.createReadStream(path,{
      # 分片大小
      highWaterMark:64*1024,
      # 起始位置
      start:0,
      # 结束位置
      end:99,
      # 字符串编码集
      encoding:'utf8'
    })

Tips:highWaterMark参数对读取性能有着影响，对于大文件来说过小的highWaterMark将会导致更多的系统IO调用，导致性能低下，越大的highWaterMark设置相对来说效率越高，但是需要考虑实际情况设置highWaterMark的值，过大的值会导致滞后严重
