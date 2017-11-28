# FormData 异步上传文件

	var formData = new FormData();
	//后端使用这里指定的键名获取文件，也就是file
    formData.append('file',$('#fileExcel')[0].files[0]);
    sendAjax('{:url("index/index/uploadExcel")}',formData);

	function sendAjax(url, file) {
        $.ajax({ 
            url : url, 
            type : 'POST', 
            data : file,
            // 告诉jQuery不要去处理发送的数据 非常重要
            processData : false, 
            // 告诉jQuery不要去设置Content-Type请求头 非常重要
            contentType : false,
            success : function(e) { 
                if(e.status){
                    layer.msg(e.msg, {
                        icon: 1,
                        shade: 0.25,
                        time: 1000,
                        end: function() {
                            window.location.reload();
                        }
                    });
                }else{
                    layer.msg(e.msg, {
                        icon: 2,
                        shade: 0.25,
                        time: 1500
                    });
                }
            }, 
            error : function(responseStr) { 
                console.log("error");
            } 
        });
    }