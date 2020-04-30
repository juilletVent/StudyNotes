# JavaScript Regex

> 匹配

1. /[a-z]{23}/.text('targetStr')
2. new RegExp('/[a-z]/').text('tergetStr')

> 匹配选出

str.exec(regex);//返回匹配的串
str.match(/regex/g)//返回所有匹配的串

> 查找索引

str.search('regex')//返回匹配的下标位置

> 替换

str.replace('regex')//返回替换后的字符串

> 
