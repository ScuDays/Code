<%@page contentType="text/html; charset=UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <title>添加设备</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>

<body>
<form action="device_add_ok.jsp?action=add_device_record" id="add_record_form" name="add_record_form" method="post">
<input type="hidden" id="page_id" name="page_id" value="device_add"/>
设备    ID：<input id="device_id" name="device_id"><br>
设备名称：<input id="device_name" name="device_name"><br>
设备类型：<input id="device_type" name="device_type" value="sensor">建议输入：“video”，或者“sensor”，或者“other”<br>
<button id="add_button" name="add_button">确定添加</button>
</form>
</body>
</html>
<script>
  function submitAddRecord(){
    document.add_record_form.submit();
  }
</script>