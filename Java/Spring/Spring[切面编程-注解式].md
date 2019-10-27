## Spring 切面编程 Aspect

Spring 中的切面编程应用场景个人理解主要应用在以下几个场景中：

- 日志
- 事务
- 鉴权（或许过滤器更好用）
- 数据校验
- 其他形式的功能增强

主要是实现对目标功能的再增强

#### 实现步骤

一、在切面类上声明切面注解：

    @Aspect

二、在切面方法上声明切面类型，以及定义切入点：

    // 普通的切入点声明
    @After("execution(* cn.nanami52.sm.controller.LoginController.login(..))")
    // 多条件切入点声明
    @After("execution(* cn.nanami52.sm.controller.*.*(..)) && !execution(* cn.nanami52.sm.controller.SelfController.*(..)) && !execution(* cn.nanami52.sm.controller.*.*_page(..)) && !execution(* cn.nanami52.sm.controller.LoginController.*(..))")
    // 异常捕获式的切入点声明，方法声明中也需要添加同名的参数
    @AfterThrowing(throwing = "e", pointcut = "execution(* cn.nanami52.sm.controller.*.*(..)) && !execution(* cn.nanami52.sm.controller.SelfController.*(..))")
    // 敲黑板：一定要添加异常传入参数，Spring会自动注入进来
    public void systemLog(JoinPoint joinPoint, Throwable e) {
        writeLog(joinPoint, "System", e.toString());
    }

三、切面方法

切面方法的第一个参数是切入点对象，可以通过该对象下的 API 获取切入点的一系列信息：切入点的类名、方法名、参数等等

    // 普通切入点
    public void operationLog(JoinPoint joinPoint) {
        // do something
    }
    // 捕获异常的切入点
    public void systemLog(JoinPoint joinPoint, Throwable e) {
        // do something
    }

## 一个较为完整的例子

    package cn.nanami52.sm.advice;

    import cn.nanami52.sm_service.entity.Log;
    import cn.nanami52.sm_service.entity.Staff;
    import cn.nanami52.sm_service.service.LogService;
    import org.aspectj.lang.JoinPoint;
    import org.aspectj.lang.Signature;
    import org.aspectj.lang.annotation.After;
    import org.aspectj.lang.annotation.AfterThrowing;
    import org.aspectj.lang.annotation.Aspect;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.stereotype.Component;

    import javax.servlet.http.HttpServletRequest;
    import javax.servlet.http.HttpSession;

    @Component
    @Aspect
    public class LogAdvice {

        @Autowired
        private LogService logService;

        @After("execution(* cn.nanami52.sm.controller.LoginController.login(..))")
        public void loginLog(JoinPoint joinPoint) {
            Log log = new Log();
            // 取得切入目标对象，反射获取类，获取类名
            log.setMoudle(joinPoint.getTarget().getClass().getName());
            // 获取切入点方法签名
            Signature signature = joinPoint.getSignature();
            // 获取切入点方法名
            log.setOpration(joinPoint.getSignature().getName());
            // 获取切入点方法实参
            HttpServletRequest httpServletRequest = (HttpServletRequest) joinPoint.getArgs()[0];
            HttpSession httpSession = httpServletRequest.getSession();
            Staff user = (Staff) httpSession.getAttribute("USER");
            if (null == user) {
                log.setOperator(httpServletRequest.getParameter("account"));
                log.setResult("登陆失败");
            } else {
                log.setOperator(user.getAccount());
                log.setResult("登陆成功");
            }
            log.setOpr_type("Login");
            logService.addItem(log);
        }

        // 敲黑板：多个PointCut可以组拼，具体定义规则参考AspectJ语法定义
        // 敲黑板：IDEA识别切入点时可能会出现无法识别的问题，不用管，具体能不能实现拦截，还是要跑起来才知道
        @After("execution(* cn.nanami52.sm.controller.*.*(..)) && !execution(* cn.nanami52.sm.controller.SelfController.*(..)) && !execution(* cn.nanami52.sm.controller.*.*_page(..)) && !execution(* cn.nanami52.sm.controller.LoginController.*(..))")
        public void operationLog(JoinPoint joinPoint) {
            writeLog(joinPoint, "Operation", "成功");
        }

        @AfterThrowing(throwing = "e", pointcut = "execution(* cn.nanami52.sm.controller.*.*(..)) && !execution(* cn.nanami52.sm.controller.SelfController.*(..))")
        public void systemLog(JoinPoint joinPoint, Throwable e) {
            writeLog(joinPoint, "System", e.toString());
        }

        private void writeLog(JoinPoint joinPoint, String logType, String result) {
            Log log = new Log();
            log.setMoudle(joinPoint.getTarget().getClass().getName());
            Signature signature = joinPoint.getSignature();
            log.setOpration(joinPoint.getSignature().getName());
            HttpServletRequest httpServletRequest = (HttpServletRequest) joinPoint.getArgs()[0];
            HttpSession httpSession = httpServletRequest.getSession();
            Staff user = (Staff) httpSession.getAttribute("USER");
            log.setOperator(user.getAccount());
            log.setOpr_type(logType);
            log.setResult(result);
            logService.addItem(log);
        }
    }
