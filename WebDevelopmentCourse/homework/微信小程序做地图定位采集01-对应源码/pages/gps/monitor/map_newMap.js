Page({
  onLoad: function () {
    this.loadBaiduMap();
  },

  loadBaiduMap: function () {
    const ak = 'PmPktNkwXJLukIjTiKnyHgxYAWRGYhd0';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `http://api.map.baidu.com/api?v=2.0&ak=${ak}`;
    script.onload = this.initMap.bind(this);
    document.head.appendChild(script);
  },

  initMap: function () {
    const BMap = window.BMap;
    const map = new BMap.Map('map');
    map.centerAndZoom(new BMap.Point(104.020394, 30.567121), 14);
    map.enableScrollWheelZoom();
    map.enableKeyboard();
    map.enableDragging();
    map.enableDoubleClickZoom();

    this.addMapControl(map);
    this.addMapOverlay(map);
  },

  addMapControl: function (map) {
    const BMap = window.BMap;
    const scaleControl = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
    scaleControl.setUnit(BMAP_UNIT_IMPERIAL);
    map.addControl(scaleControl);
    const navControl = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
    map.addControl(navControl);
    const overviewControl = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: true });
    map.addControl(overviewControl);
  },

  addMapOverlay: function (map) {
    const BMap = window.BMap;
    const markers = [
      { content: "我的备注", title: "我的标记", imageOffset: { width: 0, height: 3 }, position: { lat: 30.564073, lng: 104.004584 } }
    ];
    markers.forEach(marker => {
      const point = new BMap.Point(marker.position.lng, marker.position.lat);
      const mapMarker = new BMap.Marker(point, {
        icon: new BMap.Icon("http://api.map.baidu.com/lbsapi/createmap/images/icon.png", new BMap.Size(20, 25), {
          imageOffset: new BMap.Size(marker.imageOffset.width, marker.imageOffset.height)
        })
      });
      const label = new BMap.Label(marker.title, { offset: new BMap.Size(25, 5) });
      const infoWindow = new BMap.InfoWindow(marker.content, {
        width: 200,
        title: marker.title,
        enableMessage: false
      });
      mapMarker.setLabel(label);
      mapMarker.addEventListener("click", function () {
        mapMarker.openInfoWindow(infoWindow);
      });
      map.addOverlay(mapMarker);
    });
  }
});
