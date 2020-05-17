#!/bin/bash

# 开发模式
idDev=true

# 站点默认存放位置
declare -i defWebSiteIndex=0
# 可选的默认存放位置，实际运算时配置defWebSiteIndex为目标下标即可
declare -a defWebsiteLocations=("/www/wwwroot" "./websrc")
declare -a packages=[]
# host位置
declare vhostLocation=/home/server/panel/vhost/nginx

if [ $idDev = "true" ];then
  defWebSiteIndex=1
  vhostLocation="./"
fi

# 枚举可用的压缩包
for entry in $(ls -1 | egrep '*.zip$'); do
  packages[$index]=$entry
  let "index=index+1"
done

# 选择可用的压缩包
index=1
echo -e "可选择创建的站点文件（仅支持.zip）：\n"
for item in ${packages[@]}; do
  echo "(${index}) ${item}"
  index=$index+1
done
echo -e "\n"

read -p "请选择进行站点创建的文件序号：" packageIndex
read -p "请输入存放站点的目录位置（默认：${defWebsiteLocations[$defWebSiteIndex]}）：" inputLocation
read -p "请输入站点域名，多个站点使用空格分隔：" domains
# 设置创建站点的压缩包
websitePackage=${packages[$packageIndex - 1]}
# 设置创建站点的目录
websiteLocation=${inputLocation:-${defWebsiteLocations[$defWebSiteIndex]}}

if [ ! -d $websiteLocation ]; then
  echo -e "目标文件夹不存在，创建之..."
  mkdir $websiteLocation
fi

echo 文件复制中：$websitePackage --\> $websiteLocation
cp ./${websitePackage} ${websiteLocation}/${websitePackage}

cd ${websiteLocation}

echo "文件解压中..."
for domain in ${domains}; do
  unzip ${websitePackage} -d ./${domain}
done
echo "文件解压完成."

echo "创建站点配置..."
for domain in ${domains}; do
  echo "server" >>$vhostLocation/${domain}.conf
  echo "{" >>$vhostLocation/${domain}.conf
  echo "listen 80;" >>$vhostLocation/${domain}.conf
  echo "server_name ${domain};" >>$vhostLocation/${domain}.conf
  echo "index index.php index.html index.htm default.php default.htm default.html;" >>$vhostLocation/${domain}.conf
  echo "root ${websiteLocation}/${domain}/;" >>$vhostLocation/${domain}.conf
  echo "#SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则" >>$vhostLocation/${domain}.conf
  echo "#error_page 404/404.html;" >>$vhostLocation/${domain}.conf
  echo "#SSL-END" >>$vhostLocation/${domain}.conf
  echo "#ERROR-PAGE-START  错误页配置，可以注释、删除或修改" >>$vhostLocation/${domain}.conf
  echo "#error_page 404 /404.html;" >>$vhostLocation/${domain}.conf
  echo "#error_page 502 /502.html;" >>$vhostLocation/${domain}.conf
  echo "#ERROR-PAGE-END" >>$vhostLocation/${domain}.conf
  echo "#PHP-INFO-START  PHP引用配置，可以注释或修改" >>$vhostLocation/${domain}.conf
  echo "#include enable-php-54.conf;" >>$vhostLocation/${domain}.conf
  echo "#PHP-INFO-END" >>$vhostLocation/${domain}.conf
  echo "#REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效" >>$vhostLocation/${domain}.conf
  echo "#include /www/server/panel/vhost/rewrite/${domain}.conf;" >>$vhostLocation/${domain}.conf
  echo "#REWRITE-END" >>$vhostLocation/${domain}.conf
  echo "#禁止访问的文件或目录" >>$vhostLocation/${domain}.conf
  echo "location ~ ^/(\.user.ini|\.htaccess|\.git|\.svn|\.project|LICENSE|README.md)" >>$vhostLocation/${domain}.conf
  echo "{" >>$vhostLocation/${domain}.conf
  echo "return 404;" >>$vhostLocation/${domain}.conf
  echo "}" >>$vhostLocation/${domain}.conf
  echo "#一键申请SSL证书验证目录相关设置" >>$vhostLocation/${domain}.conf
  echo "location ~ \.well-known{" >>$vhostLocation/${domain}.conf
  echo "allow all;" >>$vhostLocation/${domain}.conf
  echo "}" >>$vhostLocation/${domain}.conf
  echo "location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$" >>$vhostLocation/${domain}.conf
  echo "{" >>$vhostLocation/${domain}.conf
  echo "expires      30d;" >>$vhostLocation/${domain}.conf
  echo "error_log off;" >>$vhostLocation/${domain}.conf
  echo "access_log /dev/null;" >>$vhostLocation/${domain}.conf
  echo "}" >>$vhostLocation/${domain}.conf
  echo "location ~ .*\.(js|css)?$" >>$vhostLocation/${domain}.conf
  echo "{" >>$vhostLocation/${domain}.conf
  echo "expires      12h;" >>$vhostLocation/${domain}.conf
  echo "error_log off;" >>$vhostLocation/${domain}.conf
  echo "access_log /dev/null; " >>$vhostLocation/${domain}.conf
  echo "}" >>$vhostLocation/${domain}.conf
  echo "access_log  /www/wwwlogs/${domain}.log;" >>$vhostLocation/${domain}.conf
  echo "error_log  /www/wwwlogs/${domain}.log;" >>$vhostLocation/${domain}.conf
  echo "}" >>$vhostLocation/${domain}.conf

done
echo "站点配置创建完成."

read -p "是否删除复制的站点压缩包？(def:y/n)" delete
delete=${delete:-'y'}

if [ $delete = "y" -o $delete = "Y" ]; then
  rm -f ${websitePackage}
  echo "已删除站点压缩包."
fi

read -p "执行完毕！" pause
