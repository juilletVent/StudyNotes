<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Nodejs内存机制](#nodejs%E5%86%85%E5%AD%98%E6%9C%BA%E5%88%B6)
- [V8的垃圾回收机制](#v8%E7%9A%84%E5%9E%83%E5%9C%BE%E5%9B%9E%E6%94%B6%E6%9C%BA%E5%88%B6)
  - [1、针对新生代的对象使用Scavenge `/ˈskævɪndʒ/`算法进行回收，](#1%E9%92%88%E5%AF%B9%E6%96%B0%E7%94%9F%E4%BB%A3%E7%9A%84%E5%AF%B9%E8%B1%A1%E4%BD%BF%E7%94%A8scavenge-%CB%88sk%C3%A6v%C9%AAnd%CA%92%E7%AE%97%E6%B3%95%E8%BF%9B%E8%A1%8C%E5%9B%9E%E6%94%B6)
  - [2、Mark-Sweep `/swiːp/`](#2mark-sweep-swi%CB%90p)
  - [3、Mark-Compact `kɒmpækt`](#3mark-compact-k%C9%92mp%C3%A6kt)
- [使用内存作为缓存的风险](#%E4%BD%BF%E7%94%A8%E5%86%85%E5%AD%98%E4%BD%9C%E4%B8%BA%E7%BC%93%E5%AD%98%E7%9A%84%E9%A3%8E%E9%99%A9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Nodejs内存机制

nodejs基于V8，具有内存使用上限，64位系统的内存使用上限为1.4GB左右，32位系统位0.7GB左右

调整nodejs可使用的内存大小方法，调整仅启动时生效，后续无法动态更改，在启动node时添加启动参数：

    # 老生代变量存储使用的最大空间，单位：Mb
    node --max-old-space-size=1700 start.js
    # 新生代变量存储使用的最大空间，单位：Kb
    node --max-new-space-size=1024 start.js

V8中可用的堆内存划分为新生代与老生代区域，存放生命周期时长不同的对象，新生代存放生命周期较短的变量，老生代存放生命周期较长或者常驻内存的对象，采用完全不同的垃圾回收算法进行管理，Buffer类型申请的内存不在Nodejs内存限制范畴内

## V8的垃圾回收机制

v8的垃圾回收机制有三种算法，针对不同的场景使用不同的算法进行垃圾回收：

### 1、针对新生代的对象使用Scavenge `/ˈskævɪndʒ/`算法进行回收，

算法简单描述：将可用的的总体空间划分为两块，定义为From、To,内存分配发生在From,当触发垃圾回收时，检查对象存活状态，将存活的对象复制到To空间，然后释放From空间全部内容，交换From与To空间的角色。优点：时间成本低，弊端：空间利用率低，针对大空间下的垃圾回收效率低下，对于长时间存活的对象效率低下

tips：在v8中，一个对象经历了一次scavenge后如果还存活，则会进行对象晋升，会移动至老生代空间，使用mark-sweep&mark-compact进行内存管理，所以新生代空间一般较小

### 2、Mark-Sweep `/swiːp/`

算法描述：检查空间内所有对象的存活状态，标记已经死亡的对象，然后清理对应的对象，优点：时间成本适中，弊端：会产生内存碎片

### 3、Mark-Compact `kɒmpækt`

算法描述：检查空间内所有对象存活状态，标记死亡的对象，然后将活着的对象移动至内存空间的异端，得出有效数据边界后，清理边界外的内存，弊端：时间成本很高，优点：无碎片


## 使用内存作为缓存的风险

将内存作为缓存时，需要限制缓存的增长，以及缓存的及时失效策略，否则可能导致缓存持续占用内存，进而触发v8内存限制，进程退出

