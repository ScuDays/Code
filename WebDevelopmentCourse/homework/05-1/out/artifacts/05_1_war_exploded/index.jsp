<%--
  Created by IntelliJ IDEA.
  User: yd
  Date: 2024/4/1
  Time: 10:43
  To change this template use File | Settings | File Templates.
--%>

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
  <meta charset="UTF-8">
  <title>$Title$</title>
</head>
<body>
<input type="text" id="input" placeholder="请输入内容">
<!-- 提交按钮 -->
<button onclick="submit()">提交到后端</button>
<button onclick="getSource()">从后端获取数据</button>
<div id="content"></div>

<script>
  function submit() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'backGet.jsp', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log('数据已发送到后端');
      } else {
        console.error('发送数据失败，状态码：', xhr.status);
      }
    };
    var textValue = document.getElementById("input").value;
    var sendData = {"user.id": "user_2024","user_name":"LiHua"};
    if(textValue != null)sendData = textValue;

    xhr.send(JSON.stringify(sendData));

  }
  function getSource() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'backSend.jsp', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = JSON.parse(xhr.responseText); // 解析收到的JSON数据
        var container = document.getElementById('content'); // 获取显示数据的容器

        // 确保aaData存在且是一个数组
        if (data.aaData && Array.isArray(data.aaData)) {
          // 清空容器内的现有内容
          container.innerHTML = '';

          // 遍历aaData数组
          data.aaData.forEach(function(item) {
            var content = '';
            for (var key in item) {
              if (item.hasOwnProperty(key)) { // 确保是item自身的属性
                content += key + ': ' + item[key] + '<br>';
              }
            }

            // 将字符串设置为content的内容
            container.innerHTML = content;

          });
        } else {
          // 如果aaData不存在，则报错
          container.innerHTML = '无法加载数据或数据格式不正确';
        }

        console.log('数据接收成功');
      } else {
        console.error('接收数据失败，状态码：', xhr.status);
      }
    };
    xhr.send();
  }

</script>
</body>
</html>

