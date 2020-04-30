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