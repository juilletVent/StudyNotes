<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Vue Ajax网络访问](#vue-ajax%E7%BD%91%E7%BB%9C%E8%AE%BF%E9%97%AE)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Vue Ajax网络访问

引入Vue-resource文件

~~~

this.$http.post(SCOPE.URL_SUBMIT,{
    _token:SCOPE._token,
    use:this.use,
    pwd:this.pwd
}).then(function(response){
    if(response.body.status==1){
        alert('恭喜，'+response.body.msg);
    }else{
        alert('很遗憾，'+response.body.msg);
    }
},function(response){
    alert('网络错误');
})

~~~