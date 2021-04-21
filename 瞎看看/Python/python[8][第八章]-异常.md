<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [异常](#%E5%BC%82%E5%B8%B8)
    - [捕捉异常](#%E6%8D%95%E6%8D%89%E5%BC%82%E5%B8%B8)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 异常

异常抛出关键字：raise，而不是常用的 throw关键字

一个小栗子：

    raise Exception // 没有任何信息的异常
    raise Exception("Error") // 带有信息的异常

> 自定义Exception

只需要继承Exception即可

#### 捕捉异常

使用except进行异常捕捉，后接捕捉的异常类型

    try:
        x = input('place input x:')
        print x/0
    except Exception: # 异常接管与java异常接管方式一样，自底向上根据异常类继承关系进行捕捉
        print '发生了一些异常'
    except (Exception1,Exception):
        print '多个异常捕捉'

    # 捕捉所有异常
    except:
        print '发生了一个未知的异常'
    # 这会屏蔽ctrl+c以及sys.exit关闭程序的意图，造成一定的麻烦

    # else 子句
    else:
        pass # 只在正常通过时触发，如果except被触发则else不会执行

    # finally 子句
    finally:
        pass #执行清理语句，使用与java一致

    
