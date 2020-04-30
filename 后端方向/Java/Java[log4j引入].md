## 引入日志

> Maven 依赖

    <dependency>
        <groupId>commons-logging</groupId>
        <artifactId>commons-logging</artifactId>
        <version>1.1</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-api</artifactId>
        <version>2.0.2</version>
    </dependency>
    <dependency>
        <groupId>org.apache.logging.log4j</groupId>
        <artifactId>log4j-core</artifactId>
        <version>2.0.2</version>
    </dependency>

resource根路径下新建log4j2.xml文件，内容如下：

    <?xml version="1.0" encoding="UTF-8"?>
    <configuration status="OFF">
        <appenders>
            <Console name="Console" target="SYSTEM_OUT">
                <PatternLayout pattern="%d{HH:mm:ss.SSS} [%t] %-5level %logger{36} - %msg%n"/>
            </Console>
        </appenders>
        <loggers>
            <logger name="com.relin.HelloLog4j" level="error" additivity="false">
                <appender-ref ref="Console"/>
            </logger>
            <root level="trace">
                <appender-ref ref="Console"/>
            </root>
        </loggers>
    </configuration>

完事儿~具体的自定义参考文档进行修改