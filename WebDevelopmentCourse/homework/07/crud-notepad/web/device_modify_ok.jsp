<%@page contentType="text/html; charset=UTF-8"
        import="java.sql.*,java.io.*"%>
<%@ page import="java.util.Date" %>
<%@ page import="java.text.SimpleDateFormat" %>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<%
  request.setCharacterEncoding("UTF-8");
  String id=request.getParameter("id");
  String deviceId=request.getParameter("device_id");
  String deviceName=request.getParameter("device_name");
  String deviceType=request.getParameter("device_type");
  System.out.println("收到device_id："+deviceId);
  System.out.println("收到device_name："+deviceName);
  System.out.println("收到device_type："+deviceType);
  String createTime=(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")).format(new Date());
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
    String sql="update device_file set device_id='"+deviceId+"',device_name='"+deviceName+"',create_time='"+createTime+"' where id="+id;
    System.out.println("执行"+sql);
    statement.executeUpdate(sql);
    //如果查询有结果，则循环显示查询出来的记录
    System.out.println("<br>====================开始输出====================");
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
</body>
</html>
<script>
  function listRecord(){
    window.location="device_list.jsp";
  }
</script>
