<%@ page import="java.io.BufferedReader" %>
<%@ page import="java.io.FileReader" %>
<%@ page import="java.io.IOException" %><%@ page import="java.io.PrintWriter"%>
<%@ page contentType="application/json;charset=UTF-8" language="java" %>

<%
    // 指定要读取的文件路径
    String filePath = "D:\\OneDrive\\桌面\\Code\\WebDevelopmentCourse\\homework\\05-1\\web\\WEB-INF\\source\\sendSource.json";

    // 使用StringBuilder来收集文件内容
    StringBuilder jsonContent = new StringBuilder();
    BufferedReader reader = null;

    try {
        // 初始化BufferedReader来读取文件
        reader = new BufferedReader(new FileReader(filePath));
        String line;

        // 读取文件内容到StringBuilder
        while ((line = reader.readLine()) != null) {
            jsonContent.append(line);
        }
    } catch (IOException e) {
        // 异常处理
        e.printStackTrace();
    } finally {
        if (reader != null) {
            try {
                reader.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    // 设置内容类型
    response.setContentType("application/json");
    response.setCharacterEncoding("UTF-8");

    // 发送文件
    //获取与当前HTTP请求关联的输出流。
    PrintWriter ptw = response.getWriter();
    //发送
    ptw.print(jsonContent.toString());
    //强制将PrintWriter缓冲区内的内容刷新到输出流中
    ptw.flush();
%>