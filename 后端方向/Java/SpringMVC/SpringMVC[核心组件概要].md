## 核心组件概要

- DispatcherServlet：前置核心控制器，请求入口，负责请求分发、调度
- Handler：请求实际处理器
- HandlerMapping：请求映射器，将请求映射到对应的 Handler
- HandlerInterceptor：处理器拦截器
- HandlerExecutionChain：处理器执行链
- HandlerAdapter：处理器适配器
- ModelAndView：装载模型数据和视图
- ViewResolver：视图解析器

## 通用简单处理流程概要

1. 请求进入：DispatcherServlet 接受请求
2. 根据 HandlerMapping 将请求分发到 Handler
3. 生成 Handler，回调 HandlerInterceptor 的 Hook
4. 以 HandlerExecutionChain 包装 Handler 以及 HandlerInterceptor hook 链
5. DispatcherServlet 取得 HandlerExecutionChain 包装的执行器，之后通过 HandlerAdapter 来执行具体的 Handler
6. 执行完成后会返回一个ModelAndView给DispatcherServlet
7. DispatcherServlet通过ViewResolver解析数据绑定，生成物理view响应给客户端