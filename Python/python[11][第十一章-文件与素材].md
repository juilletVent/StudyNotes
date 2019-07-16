## 第十一章 文件

python中的文件操作基本与c语言中的文件操作一致，几乎所有的概念都是共通的，文件指针，文件操作模式，读写位置，基本完全相同，所以按照c语言的思路进行编写即可，操作api也非常相似

#### 打开文件

api：open

参数：

- path：文件路径，必须
- mode：打开模式，默认只读 可选值：r 只读 w 写模式 a 追加 b 二进制 + 读写模式 多个模式可以组合 类似 a+r b+r r+
- buffer：缓冲区大小，大于0的数字 解释为缓冲区的大小，单位为字节，0表示不使用缓冲区，所有读写操作直接针对磁盘，所有的负数解释为使用默认的缓冲区大小

    try:
        fileObj = open('/Users/ran/Desktop/testfile')
    except Exception:
        print 'file not exits.'

ps：在模式中加入 U 参数将会使换行字符自动进行转换，而不管是什么平台，如果编写跨平台的应用程序，这可能很重要

#### 文件读写

api:

- write
- writelines 不会添加换行符，应使用os.linesep进行换行符的添加
- read
- readline
- readliens 返回整个文件line数组列表
- seek移动文件位置指针，offset：移动的偏移量，whence：偏移参考点：默认文件头部0 可以设置为：1 相对于当前位置 2 相对于文件尾部

栗子：

    fp = open('/file.dat','r+')
    fp.write('Hello file');
    fp.seek(0) # 移动文件指针，不然读取不到，写入之后文件指针移动到了文件尾部
    print fp.readline()
    fp.close()

> 刷新缓冲区 & 强制写出

调用flush方法即可强制写出缓冲区数据至磁盘

> 使用for语句进行迭代

这种迭代方式，文件句柄交由系统处理，无需手动关闭

    for line in open('/Users/ran/Desktop/testfile'):
        print line

> 使用print输出行，而不是拼接

    print >> fileObj,'this is new line'

print会自动追加一个换行符在行末尾

#### 关闭文件

与c语言一样，在使用了文件后应关闭文件引用

python 2.5以后引入了 with语句来帮助完成文件关闭的操作，栗子如下：

    # 在with语句结束后文件对象将会自动关闭
    with open('/Users/ran/Desktop/testfile','r+') as fileObj:
        fileObj.writelines('Hello Python.' + os.linesep)
        fileObj.writelines(time.asctime())
        fileObj.seek(0)
        # print str(fileObj.readlines())
        print fileObj.readline()
        print fileObj.readline()




