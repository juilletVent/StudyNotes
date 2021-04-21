<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [SpringBoot 开启 Swagger](#springboot-%E5%BC%80%E5%90%AF-swagger)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## SpringBoot 开启 Swagger

1、引入依赖

        <!-- swagger -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger2</artifactId>
            <version>2.7.0</version>
        </dependency>
        <!-- swagger-ui -->
        <dependency>
            <groupId>io.springfox</groupId>
            <artifactId>springfox-swagger-ui</artifactId>
            <version>2.7.0</version>
        </dependency>

2、开启 SpringBoot 支持，在入口类上添加注解`@EnableSwagger2()`

3、创建配置类，内容如下：

        // 用@Configuration注解该类，等价于XML中配置beans；用@Bean标注方法等价于XML中配置bean。
        @Configuration
        public class Swagger2 {

            @Bean
            public Docket createRestApi() {
                return new Docket(DocumentationType.SWAGGER_2)
                        .groupName("warehouse")
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
                        .title("仓储管理 API Document")
                        .description("仓管API文档")
                        .termsOfServiceUrl("http://localhost:8080")
                        .license("Apache License Version 2.0")
                        .licenseUrl("https://www.apache.org/licenses/LICENSE-2.0")
                        .version("1.0.0").build();
            }
        }
