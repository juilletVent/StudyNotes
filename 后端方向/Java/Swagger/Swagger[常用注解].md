<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Swagger 文档常用注解](#swagger-%E6%96%87%E6%A1%A3%E5%B8%B8%E7%94%A8%E6%B3%A8%E8%A7%A3)
- [忽略某个字段](#%E5%BF%BD%E7%95%A5%E6%9F%90%E4%B8%AA%E5%AD%97%E6%AE%B5)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Swagger 文档常用注解

- @Api(value = "card", tags = "卡片管理 3") ：标明对象为 Api 类，tags 为本组接口组名

- @ApiOperation(value = "接口简单描述",notes = "详细描述",httpMethod = "GET/POST/PUT/PATCH/DELETE(请求类型描述，根据 RESTful 进行规范化定义即可)",response = getCardList.class（响应的数据类型）)

    - value：接口简单描述
    - notes：接口详细描述
    - httpMethod:"GET/POST/PUT/PATCH/DELETE" 请求类型
    - response：响应模型的class


- @ApiImplicitParams({
  @ApiImplicitParam(name = "pageNo(参数名称)", value = "当前页码(参数描述)", paramType = "query|path|body|request(body 以及 quest 都是 body 提交，path 需要配合路径参数书写:/get/{id})", dataType = "int", defaultValue = "1",allowableValues="1,2,3（单选值，逗号分隔）"),

  - name：参数名称
  - value：参数描述
  - paramType：query|path|body|request(body 以及 quest 都是 body 提交，path 需要配合路径参数书写:/get/{id})
  - dataType：参数类型描述
  - defaultValue：默认值描述
  - allowableValues：枚举类型参数，逗号分隔


## 忽略某个字段

不在文档中生成，使用`@JsonIgnore`这个注解不属于Swagger，而属于jackson
