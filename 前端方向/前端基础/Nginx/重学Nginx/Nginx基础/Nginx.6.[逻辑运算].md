## Nginx 逻辑运算

nginx 的配置中不支持 if 条件的逻辑与&& 逻辑或|| 运算 ，而且不支持 if 的嵌套语法，否则会报下面的错误：

    nginx: [emerg] invalid condition

可以使用变量间接实现：

```nginx
# 需要实现的伪代码
if ($arg_unitid = 42012 && $uri ~ /thumb/){
  echo "www.ttlsa.com";
}
```

_Tips : if 与 括号之间必须有空格，不然报错_

如果按照这样来配置，就会报 nginx: [emerg] invalid condition 错误，可以这么来实现，如下所示：

```nginx
set $flag 0;
if ($uri ~ ^/thumb/[0-9]+_160.jpg$){
  set $flag "${flag}1";
}
if ($arg_unitid = 42012){
  set $flag "${flag}1";
}
if ($flag = "011"){
  echo "www.ttlsa.com";
}
```

## 判断相关的规则

1、正则表达式匹配：

| 表达式 | 作用                                                                   |
| :----- | :--------------------------------------------------------------------- |
| =      | 等值比较;                                                              |
| ~      | 判断匹配与否时区分字符大小写；                                         |
| ~\*    | 判断匹配与否时不区分字符大小写；                                       |
| !~     | 与指定正则表达式模式不匹配时返回“真”，判断匹配与否时区分字符大小写；   |
| !~\*   | 与指定正则表达式模式不匹配时返回“真”，判断匹配与否时不区分字符大小写； |

2、文件及目录匹配判断：

| 表达式  | 作用                                     |
| :------ | :--------------------------------------- |
| -f, !-f | 判断指定的路径是否为存在且为文件；       |
| -d, !-d | 判断指定的路径是否为存在且为目录；       |
| -e, !-e | 判断指定的路径是否存在，文件或目录均可； |
| -x, !-x | 判断指定路径的文件是否存在且可执行；     |

## 使用说明

Nginx 中 if 主要配合 rewrite 进行条件路径重写，不能用作“条件配置”，类似于这种配置，想法就是错误的：

```nginx
# 不能用这种方式来区分配置
location / {
  if ( $arg_type = '1' ) {
    root /www/websit1;
  }
  if ( $arg_type != '1' ) {
    root /www/websit_other;
  }
  try_files $uri index.html;
}
# 正确思路应该是使用rewrite重新分发
location / {
  if ( $arg_type = '1' ) {
    rewrite .* /websit1/$1/ break;
  }
  if( $arg_type != '1' ) {
    rewrite .* /websit_other/$1/ break;
  }
}
# 实际分发的配置
location ^~ /websit1 {
  root /www/website1;
}
location ^~ /websit_other {
  root /www/website_other;
}
```

另外一个小栗子：

```nginx
location / {
    if ( $arg_type = '1' ) {
        rewrite .* /index1.html last;
    }

    if ( $arg_proxy_domain != '' ){
        rewrite /.* /proxy/$arg_proxy_domain last;
    }

    index index.html;
    root   /root/nginx-test/nginx-1.18/conf/www;
}

location = /index1.html {
    index index1.html;
    root   /root/nginx-test/nginx-1.18/conf/www;
}

location ~ /proxy/(.*) {
    add_header Host www.baidu.com;
    add_header Port 80;
    proxy_pass https://$1/;
}
```
