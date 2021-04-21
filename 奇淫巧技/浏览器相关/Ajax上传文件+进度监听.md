<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Ajax 文件上传+进度监听](#ajax-%E6%96%87%E4%BB%B6%E4%B8%8A%E4%BC%A0%E8%BF%9B%E5%BA%A6%E7%9B%91%E5%90%AC)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Ajax 文件上传+进度监听

	//记录当前时间
    var time = new Date().getTime();
    //记录当前进度
    var percentage = null;
    //记录当前上传速度
    var velocity = null;
    //记录已上传文件字节大小
    var loaded = 0;
    $.ajax({
        url: 'Url',
        type: "POST",
        data: formData,
        contentType: false, // 必须 不设置内容类型
        processData: false, // 必须 不处理数据
        xhr: function xhr() {
            //获取原生的xhr对象
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                //添加 progress 事件监听
                xhr.upload.addEventListener('progress', function(e) {
                    var nowDate = new Date().getTime();
                    //每一秒刷新一次状态
                    if (nowDate - time >= 1000) {
                        //已上传文件字节数/总字节数
                        percentage = parseInt(e.loaded / e.total * 100);
                        //当前已传大小(字节数)-一秒前已传文件大小(字节数)
                        velocity = (e.loaded - loaded) / 1024;
                        if (percentage >= 99) {
                            $(".hintText").html('服务端正在解析，请稍后');
                        } else {
                            //修改上次记录时间及数据大小
                            time = nowDate;
                            loaded = e.loaded;
                        }
                    } else {
                        return;
                    }
                }, false);
            }
            return xhr;
        },
        success: function success(response) {
            //成功回调   
        },
        error: function error(error) {
            //失败回调    
        }
    });







有效期 =》 项目质保期
增加工期 可以为中文
签约时间 =》 非必须字段
