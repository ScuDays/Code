<%--
  Created by IntelliJ IDEA.
  User: yd
  Date: 2024/3/29
  Time: 10:25
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>$Title$</title>
  </head>
  <body>
  <input type="text" id="input" placeholder="请输入内容">
  <!-- 提交按钮 -->
  <button onclick="submit()">提交到后端</button>
  <button onclick="getSource">从后端获取数据</button>
  <div id="content"></div>

  <script>
    function submit() {

      var xhr = new XMLHttpRequest();
      xhr.open('POST', 'back.java', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          console.log('数据已发送到后端');
        } else {
          console.error('发送数据失败，状态码：', xhr.status);
        }
      };
      var sendData = {"user.id": "user_2024","user_name":"张三"};
      xhr.send(JSON.stringify(sendData));

    }
    function getSource() {
      //获取对应组件
      var input = document.getElementById("input").value;
      document.getElementById("content").innerText = input;
    }
  </script>
  </body>
</html>
