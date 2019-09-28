<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>慕课网用户管理中心</title>
    <link rel="stylesheet" href="lib/bootstrap-3.3.7-dist/css/bootstrap.min.css">
    <script src="lib/2.2.4/jquery-1.12.4.min.js"></script>
    <script src="lib/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
</head>
<body>
<div class="">
    <div class="page-header">
        <h1>慕课网后台管理系统
            <small>用户数据管理中心</small>
        </h1>
    </div>
</div>
<div class="">
    <div class="jumbotron">
        <h1>MyBatis基础入门课程!</h1>
        <p>通过一个项目来完成基础部分的学习</p>
        <p><a class="btn btn-primary btn-lg" href="#" role="button">查看更多，请上慕课网</a></p>
        <p><a class="btn btn-primary btn-lg" href="${pageContext.request.contextPath}/addusers.jsp"
              role="button">新增用户</a></p>
    </div>
</div>
<div class="">
    <table class="table table-hover table-striped">
        <tr>
            <th>用户编号</th>
            <th>登录账号</th>
            <th>用户昵称</th>
            <th>邮箱</th>
            <th>联系方式</th>
            <th>账号创建时间</th>
            <th>用户状态</th>
            <th>操作</th>
        </tr>
        <c:forEach var="user" items="${usersList}">
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.nickname}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>
                    <fmt:formatDate value="${user.createTime}" pattern="yyyy-MM-dd HH:mm:ss"></fmt:formatDate>
                </td>
                <td>
                    <c:if test="${0==user.userStatus}">
                        正常
                    </c:if>
                    <c:if test="${1==user.userStatus}">
                        锁定
                    </c:if>
                    <c:if test="${2==user.userStatus}">
                        删除
                    </c:if>
                </td>
                <td>
                    <a href="${pageContext.request.contextPath}/detail?id=${user.id}">查看</a>
                    <c:if test="${0==user.userStatus}">
                        <a href="${pageContext.request.contextPath}/modify?type=lock&id=${user.id}">锁定</a>
                    </c:if>
                    <c:if test="${1==user.userStatus}">
                        <a href="${pageContext.request.contextPath}/modify?type=unlock&id=${user.id}">解锁</a>
                    </c:if>
                    <a href="${pageContext.request.contextPath}/modify?type=delete&id=${user.id}">删除</a>
                </td>
            </tr>
        </c:forEach>
    </table>
</div>

</body>
</html>