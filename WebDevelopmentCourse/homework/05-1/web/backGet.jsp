<%@ page import="java.io.BufferedReader" %>
<%@ page contentType="application/json;charset=UTF-8" language="java" %>
<%
    request.setCharacterEncoding("UTF-8");
    BufferedReader reader = request.getReader();
      String input = null;
      String requestBody = "";
      while((input = reader.readLine()) != null){
        requestBody = requestBody + input;
      }
      System.out.println("接收到的数据为："+requestBody);
%>

