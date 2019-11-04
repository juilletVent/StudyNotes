## SpringMVC 常用注解说明

- @RestController：标明当前控制器为数据控制器，所有方法返回值不经过 ViewParser，直接返回
- @RequestMapping：标注访问路径，可用于 Controller 类，或者类方法，标注访问路径，记得一定要书写 produces 属性，标明返回类型为 json
- @ResponseBody：标注方法，标明本方法不经过 ViewParser 直接返回

* @RequestParam：参数注入绑定注解，标明注入的参数名称，也就是 Request 中的参数名称，会绑定到被注解的形参中
* @RequestBody：参数注入绑定注解，请求的 Body 参数会绑定到具体的形参上 //栗子： @ApiParam(value = "用户信息") @RequestBody User user
* @PathVarible：路径参数注解，相应的路径参数会注入到被注解的形参中，RequestMapping 的路径写成/get/{id}这种即可

**重点：在使用 RequestMapping 时，一定要写上 produces = "application/json;charset=UTF-8，这会将响应类型变更为 json，在 Swagger 中会格式化显示"**
