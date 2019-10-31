## 基础配置流程

1、依赖配置

引入依赖：spring-webmvc、servlet依赖

2、配置前置Servlet：DispatcherServlet （配置spring 配置文件的位置在何处 init-param contextConfigLocation），配置路径拦截为所有路径

3、编写Handler，并配置路径与Handler的映射关系（xml|注解）

4、配置视图解析器前缀后缀参数 InternalResourceViewResolver（prefix|suffix）

5、开启Spring组件自动扫描



