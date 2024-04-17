<%@page contentType="text/html; charset=UTF-8"
        import="java.sql.*,java.io.*"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>修改设备</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<%
    request.setCharacterEncoding("UTF-8");
    String id=request.getParameter("id");
    String deviceId=null;
    String deviceName=null;
    System.out.println("收到id："+id);
    //链接数据库，加载jdbc的驱动com.mysql.jdbc.Driver
    try {
        Class.forName("com.mysql.jdbc.Driver");
        System.out.println("加载了驱动<br>");
    } catch (ClassNotFoundException classnotfoundexception) {
        //如果有异常就抛出
        classnotfoundexception.printStackTrace();
    }
    try {
        System.out.println("开始链接数据库<br>");
        //链接数据库，IP地址是localhost，端口是3306，账号和密码是ylx，这些都可以更改
        Connection conn = DriverManager
                .getConnection("jdbc:mysql://localhost:3366/test?user=ylx&password=ylx&useUnicode=true&characterEncoding=UTF-8");
        System.out.println("链接完毕，开始创建准备数据库操作的statement<br>");
        Statement statement = conn.createStatement();
        System.out.println("Connect Database Ok！！！");
        //执行查询语句，返回结果集
        System.out.println("执行select * from device_file");
        ResultSet rs = statement
                .executeQuery("select * from device_file where id="+id);
        System.out.println("执行完毕，逐条显示<br>");
        //如果查询有结果，则循环显示查询出来的记录
        System.out.println("<br>====================开始输出====================");
        while (rs.next()) {
            deviceId=rs.getString("device_id");
            deviceName=rs.getString("device_name");
        }
        System.out.println("====================显示完毕====================<br>");
        out.println("<button onclick=\"javascript:listRecord();\">返回列表</button><br>");
        statement.close();
        conn.close();
        System.out.println("Database Closed！！！");
    } catch (SQLException sqlexception) {
        System.out.println("数据库访问出错："+sqlexception.getMessage());
        sqlexception.printStackTrace();
    }
%>

<body>
<form action="device_modify_ok.jsp?action=modify_device_record" id="modify_record_form" name="modify_record_form" method="post">
    <input type="hidden" id="page_id" name="page_id" value="device_modify"/>
    <input type="hidden" id="id" name="id" value="<%=id%>"/>
    设备 ID：<input id="device_id" name="device_id" value="<%=deviceId%>"><br>
    设备名称：<input id="device_name" name="device_name" value="<%=deviceName%>"><br>
    <button id="modify_button" name="modify_button">提交修改</button>
</form>
</body>
</html>
<script>
    function submitModifyRecord(){
        document.modify_record_form.submit();
    }
</script>