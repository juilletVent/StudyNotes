## SpringMVC 集成 Swagger

1、添加依赖，Swagger 最好使用 2.7.0 版本，2.8.x 及以上的版本，前端变换很大，排版没有 2.7 紧凑，不利于前端查看、调试，最好使用这个版本，jackson 为必须选项，对象序列化的时候会使用到

    <properties>
        <version.jackson>2.9.6</version.jackson>
    </properties>

    <!-- jackson为必须选项，不添加将会导致Swagger报错：ObjectMapper之类的报错 -->
    <!-- jackson用于将springfox返回的文档对象转换成JSON字符串 -->
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-annotations</artifactId>
        <version>${version.jackson}</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-databind</artifactId>
        <version>${version.jackson}</version>
    </dependency>
    <dependency>
        <groupId>com.fasterxml.jackson.core</groupId>
        <artifactId>jackson-core</artifactId>
        <version>${version.jackson}</version>
    </dependency>
     <!-- jackson用于将springfox返回的文档对象转换成JSON字符串 -->

    <!-- ========swagger2 api自动生成工具 start======== -->
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger2</artifactId>
        <version>2.7.0</version>
    </dependency>
    <dependency>
        <groupId>io.springfox</groupId>
        <artifactId>springfox-swagger-ui</artifactId>
        <version>2.7.0</version>
    </dependency>
    <!-- ========swagger2 api自动生成工具 end======== -->

2、创建 Swagger 配置类

    @Configuration // 标明配置类
    @EnableSwagger2 // 启用Swagger2
    @EnableWebMvc // 非SpringBoot项目需要书写
    public class SwaggerConfig {

        @Bean
        public Docket createRestApi() {
            return new Docket(DocumentationType.SWAGGER_2)
                    .groupName("test")
                    .enable(true)
                    .apiInfo(apiInfo()).select()
                    // 对所有该包下的Api进行监控，如果想要监控所有的话可以改成any()
                    // .apis(RequestHandlerSelectors.basePackage("cn.nanami52.test"))
                    // 只到添加了Api注解的类进行生成
                    .apis(RequestHandlerSelectors.withClassAnnotation(Api.class))
                    // 对所有路径进行扫描
                    .paths(PathSelectors.any())
                    .build();
        }

        /**
        * @return 生成文档说明信息
        */
        private ApiInfo apiInfo() {
            return new ApiInfoBuilder()
                    .title("仓储管理API Document")
                    .description("仓管API文档")
                    .termsOfServiceUrl("http://localhost:8080/")
                    .version("1.0.0").build();
        }
    }

3、开启 Spring 静态资源转发

    <mvc:default-servlet-handler/>

4、配置 Swagger 配置类的 Bean 信息

    <bean class="cn.nanami52.test.config.SwaggerConfig"/>

5、创建响应实体，书写相关字段说明

注意，必须要有 setter、getter，否则框架无法访问私有属性，将会报错

    package cn.nanami52.test.entitiy;
    import io.swagger.annotations.ApiModel;
    import io.swagger.annotations.ApiModelProperty;
    @ApiModel
    public class User {
        @ApiModelProperty("用户名")
        private String username;
        @ApiModelProperty("密码")
        private String password;
        @ApiModelProperty("用户id")
        private String id;
        ...
        getter / setter / Constructor
        ...
    }

6、为 Controller 添加 Api 注解说明

    package cn.nanami52.test.controller;

    import cn.nanami52.test.entitiy.User;
    import com.fasterxml.jackson.core.JsonProcessingException;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import io.swagger.annotations.*;
    import org.springframework.web.bind.annotation.RequestMapping;
    import org.springframework.web.bind.annotation.RequestMethod;
    import org.springframework.web.bind.annotation.RestController;

    @Api(value = "homeController", tags = "Test接口")
    @RestController
    @RequestMapping("/home")
    public class UserController {

        @RequestMapping(value = "/get", method = RequestMethod.GET)
        @ApiOperation(value = "通过id获取用户信息", notes = "ID获取用户信息222", httpMethod = "GET", response = User.class)
        @ApiImplicitParams({
                @ApiImplicitParam(value = "用户ID", name = "id", type = "string", required = true, paramType = "query"),
                @ApiImplicitParam(value = "用户名", name = "username", type = "string", paramType = "query")
        })
        public String getUser() {
            // 使用jackson进行对象序列化，转成json
            ObjectMapper mapper = new ObjectMapper();
            User user = new User("iiisd", "dsads", "dsadsa");

            try {
                return mapper.writeValueAsString(user);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
                return "对象序列化Exception";
            }
        }

    }

7、访问 Swagger 文档：http://项目根路径/swagger-ui.html

具体的 Swagger 注解单独进行罗列
