<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [XXXX为磁盘名称](#xxxx%E4%B8%BA%E7%A3%81%E7%9B%98%E5%90%8D%E7%A7%B0)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

<!--
 * @Author: WeiHong Ran
 * @Date: 2019-08-27 00:15:19
 * @LastEditors: WeiHong Ran
 * @LastEditTime: 2019-08-27 00:17:32
 * @Description: Nothing
 -->
1. /etc 下新建文件 fstab
2. 填入内容：

  # XXXX为磁盘名称
  LABEL=XXX none ntfs rw,auto,nobrowse

3. finder ：按下快捷键command + shift + g
4. 前往 /Volume
5. 即可看见磁盘了，然后将磁盘固定在finder中即可