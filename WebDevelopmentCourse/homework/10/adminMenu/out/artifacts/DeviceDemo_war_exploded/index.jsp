<%--<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>--%>
<%--<button onclick="javascript:window.location.href='device/file/device_list.jsp'">设备管理</button>--%>
<%--<button onclick="javascript:window.location.href='device/file/device_file.jsp'">文件上传</button>--%>


<%--
  Created by IntelliJ IDEA.
  User: yd
  Date: 2024/5/23
  Time: 19:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <button onclick="javascript:window.location.href='device/admin/device_menu.jsp'"id="Super_Administrator" name="aSuper_Administrator">超级管理员</button>
    <button onclick="javascript:window.location.href='device/admin/device_user.jsp'"id="User_Manager" name="User_Manager">用户管理员</button>
    <button id="General_Administrator" name="aGeneral_Administrator">一般管理员</button>
    <button id="User_Operation" name="User_Operation">用户操作员</button>
    <button id="User" name="User">用户普通用户</button>
</head>
<body>

</body>
</html>
