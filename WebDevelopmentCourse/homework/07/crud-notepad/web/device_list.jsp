<%@page contentType="text/html; charset=UTF-8"
        import="java.sql.*,java.io.*"%>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body>
<%
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
    System.out.println("执行select * from device_file<br>");
    ResultSet rs = statement
            .executeQuery("select * from device_file");
    System.out.println("执行完毕，逐条显示<br>");
    //如果查询有结果，则循环显示查询出来的记录
    System.out.println("<br>====================开始输出====================");
    while (rs.next()) {
      out.println("<br>");
      out.println("序号："+rs.getString("id")+"<br>");
      out.println("设备ID："+rs.getString("device_id")+"<br>");
      out.println("设备名称："+rs.getString("device_name")+"<br>");
      out.println("设备类型："+rs.getString("device_type")+"<br>");
      out.println("登记时间："+rs.getString("create_time")+"<br>");
      out.println("<a href=\"javascript:modifyRecord("+rs.getString("id")+")\">【修改记录】</a><a href=\"javascript:deleteRecord("+rs.getString("id")+")\">【删除记录】</a><br>");
    }
    //加个断行
    System.out.println("<br>");
    System.out.println("====================显示完毕====================<br>");
    out.println("<button onclick=\"javascript:addRecord();\">添加设备</button><br>");
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
  function addRecord(){
    window.location.href="device_add.jsp";
  }
  function modifyRecord(id){
    window.location.href="device_modify.jsp?id="+id;
  }
  function deleteRecord(id){
    if(confirm("您确定要删除这个记录吗？id="+id)) window.location.href="device_delete_ok.jsp?id="+id;
  }
</script>