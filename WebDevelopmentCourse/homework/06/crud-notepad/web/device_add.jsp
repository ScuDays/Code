<%@page contentType="text/html; charset=UTF-8" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <title>添加设备</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body>
<form action="device_add_ok.jsp?action=add_device_record" id="add_record_form" name="add_record_form" method="post">
    <input type="hidden" id="page_id" name="page_id" value="device_add"/>
    序号：<input id="object_id" name="object_id"><br>
    事件：<input id="title" name="title"><br>
    状态：<input id="status" name="status" >建议输入：“等待完成”，或者“已完成”<br>
    截止时间：<input id="limit_time" name="limit_time" ><br>
    创建人员：<input id="creator" name="creator" ><br>
    <button type = "button" id="add_button" name="add_button" onclick="submitAddRecord()">确定添加</button>
</form>
</body>
</html>
<script>
    function submitAddRecord() {
        alert("成功添加")
        document.add_record_form.submit();
    }
</script>