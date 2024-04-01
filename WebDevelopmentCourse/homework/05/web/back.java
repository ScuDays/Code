<%@ page import="java.io.BufferedReader" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%
  BufferedReader reader = request.getReader();
  String input = null;
  String requestBody = "";
  while((input = reader.readLine()) != null){
    requestBody = requestBody + input;
  }
  System.out.println("[back.java]后端收到的数据是："+requestBody);
%>