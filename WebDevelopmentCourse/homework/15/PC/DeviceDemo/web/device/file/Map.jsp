<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="keywords" content="百度地图,百度地图API，百度地图自定义工具，百度地图所见即所得工具" />
  <meta name="description" content="百度地图API自定义地图，帮助用户在可视化操作下生成百度地图" />
  <title>百度地图API自定义地图</title>
  <!-- 引用百度地图API -->
  <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=40AYLNt8StvICMUhgpgntDnJEkebcaiV"></script>
  <style>
    html, body, #map {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
  </style>
</head>
<body>
<!-- 百度地图容器 -->
<div id="map"></www.idg.net="idg"></div>
<div id="modal" style="display:none; position: fixed; left: 50%; top: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid black; z-index: 1000;">
  <form id="editForm">
    设备ID：<input type="text" id="deviceId" name="deviceId"><br>
    设备名称：<input type="text" id="deviceName" name="deviceName"><br>
    联系人（主要）：<input type="text" id="contactMain" name="contactMain"><br>
    联系人ID：<input type="text" id="contactId" name="contactId"><br>
    联系电话：<input type="text" id="contactPhone" name="contactPhone"><br>
    <button type="button" onclick="submitForm()">提交修改</button>
    <button type="button" onclick="closeModal()">关闭窗口</button>
  </form>
</div>
<script type="text/javascript">
  // 创建和初始化地图函数：
  function initMap(){
    createMap();// 创建地图
    setMapEvent();// 设置地图事件
    addMapControl();// 向地图添加控件
    addMapOverlay();// 向地map元素添加地理标记
  }
  function createMap(){
    map = new BMap.Map("map");
    map.centerAndZoom(new BMap.Point(104.020394,30.567121),14);
  }
  function setMapEvent(){
    map.enableScrollWheelZoom();
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom();
  }
  function addClickHandler(target,window){
    target.addEventListener("click",function(){
      target.openInfoWindow(window);
    });
  }
<%--  function addMapOverlay() {--%>
<%--    var markers = [--%>
<%--      {content: "我的备注", title: "我的标记", imageOffset: {width:0, height:3}, position: {lat: 30.564073, lng: 104.004584}},--%>
<%--      {content: "作业要求", title: "作业要求", imageOffset: {width:0, height:3}, position: {lat: 30.564073, lng: 104.015584}}--%>
<%--    ];--%>
<%--    for (var index = 0; index < markers.length; index++) {--%>
<%--      var point = new BMap.Point(markers[index].position.lng, markers[index].position.lat);--%>
<%--      var marker = new BMap.Marker(point, {icon: new BMap.Icon("marker_a.png", new BMap.Size(20, 25), {--%>
<%--          imageOffset: new BMap.Size(markers[index].imageOffset.width, markers[index].imageOffset.height)--%>
<%--        })});--%>
<%--      var label = new BMap.Label(markers[index].title, {offset: new BMap.Size(25, 5)});--%>

<%--      // 添加带按钮的信息窗口--%>
<%--      var contentHtml = `--%>
<%--    <div>--%>
<%--        <p>${markers[index].content}</p>--%>
<%--        <button onclick="showModal()">修改信息</button>--%>
<%--        <button onclick="alert('设备将被删除')">删除设备</button>--%>
<%--    </div>--%>
<%--`;--%>
<%--      var opts = {--%>
<%--        width: 200,     // 信息窗口宽度--%>
<%--        title: markers[index].title, // 信息窗口标题--%>
<%--        enableMessage: false  // 不显示消息按钮--%>
<%--      };--%>
<%--      var infoWindow = new BMap.InfoWindow(contentHtml, opts);--%>
<%--      marker.setLabel(label);--%>
<%--      addClickHandler(marker, infoWindow);--%>
<%--      map.addOverlay(marker);--%>
<%--    }--%>
<%--  }--%>
  function addMapOverlay(markers){
        var markers = [
          {content: "我的备注", title: "我的标记", imageOffset: {width:0, height:3}, position: {lat: 30.564073, lng: 104.004584}},
          {content: "作业要求", title: "作业要求", imageOffset: {width:0, height:3}, position: {lat: 30.564073, lng: 104.015584}}
        ];
    for(var index = 0; index < markers.length; index++ ){
      var point = new BMap.Point(markers[index].longitude, markers[index].latitude);
      var marker = new BMap.Marker(point, {icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20,25), {
          imageOffset: new BMap.Size(0, 0)
        })});
      var label = new BMap.Label(markers[index].device_id, {offset: new BMap.Size(25, 5)});
      var opts = {
        width: 250,
        title: markers[index].device_id,
        enableMessage: false
      };
      var content =
              "设备ID: " + markers[index].device_id + "<br>" +
              "时间: " + markers[index].gps_time + "<br>" +
              "海拔: " + markers[index].altitude + " m<br>" +
              "速度: " + markers[index].speed + " km/h<br>" +
              "地点: " + markers[index].direction + "°<br>" +
              "经度: " + markers[index].longitude + "<br>" +
              "纬度: " + markers[index].latitude + "<br>" +
              "负责人: " + markers[index].creator + "<br>" +
              "负责人ID: " + markers[index].creator_id + "<br>" +
              "设备类型: " + markers[index].device_type + "<br><br>" +
              "<button onclick=\"editMarker('" + markers[index].device_id + "', '" + markers[index].creator + "', '" + markers[index].creator_id + "', '" + markers[index].device_type + "')\">修改</button>" +
              "<button onclick=\"deleteMarker('" + markers[index].device_id + "')\">删除</button>";
      var infoWindow = new BMap.InfoWindow(content, opts);
      marker.setLabel(label);
      addClickHandler(marker, infoWindow);
      map.addOverlay(marker);
    }
  }

  function addClickHandler(marker, infoWindow) {
    marker.addEventListener("click", function() {
      this.openInfoWindow(infoWindow);
    });
  }
  // 向地图添加控件
  function addMapControl(){
    var scaleControl = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_LEFT,type:BMAP_NAVIGATION_CONTROL_LARGE});
    map.addControl(navControl);
    var overviewControl = new BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:true});
    map.addControl(overviewControl);
  }
  var map;
  initMap();

  function showModal() {
    document.getElementById('modal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('modal').style.display = 'none';
  }

  function submitForm() {
    var form = document.getElementById('editForm');
    console.log('提交数据:', form.deviceId.value, form.deviceName.value, form.contactMain.value, form.contactId.value, form.contactPhone.value);
    // 这里可以添加AJAX代码提交表单数据
    closeModal(); // 提交后关闭模态窗口
  }

  function loadMarkers(){
    $.get("http://127.0.0.1:8080/gps/findAll", function(data){
      // 截取前1000个数据
      var limitedData = data.slice(0, 1000);
      var markers = limitedData.map(function(item){
        return {
          device_id: item.device_id,
          gps_time: item.gps_time,
          altitude: item.altitude,
          speed: item.speed,
          direction: item.direction,
          longitude: item.longitude,
          latitude: item.latitude,
          creator: item.creator,
          creator_id: item.creator_id,
          device_type: item.device_type
        };
      });
      addMapOverlay(markers);
    });
  }

</script>
</body>
</html>
