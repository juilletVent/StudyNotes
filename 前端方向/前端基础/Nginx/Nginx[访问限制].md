## 访问限制配置

#### limit_conn

limit_conn_zone key zone=name:size

key为限制的客户端预定义类型，如客户端IP。zone为规则命名，size为空间大小

context:http

number为连接数

limit_conn zoneName number

contest:http,server,location

2. limit_req

