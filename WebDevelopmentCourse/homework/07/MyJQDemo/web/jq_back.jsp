<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="org.json.JSONObject,java.io.IOException" %>


String data=request.getParameter("json_data_str");
System.out.println("前端发送过来的json数据为：" + data);
JSONObject json=new JSONObject();
json.put("result_code",0);
json.put("result_msg","ok");
response.setContentType("application/json; charset=UTF-8");
try {
response.getWriter().print(json);
response.getWriter().flush();
response.getWriter().close();
} catch (IOException e) {
e.printStackTrace();
}
