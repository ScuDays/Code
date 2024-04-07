<%@page contentType="text/html; charset=UTF-8"
        import="java.sql.*,java.io.*" %>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<%

    request.setCharacterEncoding("UTF-8");
    String id = request.getParameter("id");
    String object_id = request.getParameter("object_id");
    String title = request.getParameter("title");
    String status = request.getParameter("status");
    String limit_time = request.getParameter("limit_time");
    String creator = request.getParameter("creator");
    System.out.println("收到消息" + object_id + title);
    String create_time = (new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
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
                .getConnection("jdbc:mysql://localhost:3306/test?user=root&password=1224&useUnicode=true&characterEncoding=UTF-8");
        System.out.println("链接完毕，开始创建准备数据库操作的statement<br>");
        Statement statement = conn.createStatement();
        System.out.println("Connect Database Ok！！！");
        //执行查询语句，返回结果集
        String sql = "update project_todo set object_id='" + object_id + "',title='" + title + "',status='" + status + "',limit_time='" + limit_time + "'" +
                ",creator='" + creator + "' where id=" + id;
        System.out.println("执行" + sql);
        statement.executeUpdate(sql);
        //如果查询有结果，则循环显示查询出来的记录
        System.out.println("<br>====================开始输出====================");
        System.out.println("====================显示完毕====================<br>");
        out.println("<button onclick=\"javascript:listRecord();\">返回列表</button><br>");
        statement.close();
        conn.close();
        System.out.println("Database Closed！！！");
    } catch (SQLException sqlexception) {
        System.out.println("数据库访问出错：" + sqlexception.getMessage());
        sqlexception.printStackTrace();
    }
%>
</body>
</html>
<script>
    function listRecord() {
        window.location = "device_list.jsp";
    }
</script>
