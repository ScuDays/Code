Page({
  data: {
    latitude: 30.572269,
    longitude: 104.066541,
    markers: [],
    content: ''
  },

  onLoad: function() {
    this.startLocationUpdates();
    this.queryDataFromServer();
  },

  getLocation: function() {
    const that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        const latitude = res.latitude;
        const longitude = res.longitude;
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers: that.data.markers.concat({
            id: that.data.markers.length + 1,
            latitude: latitude,
            longitude: longitude,
            iconPath: '/images/zuobiaofill.png',
            width: 50,
            height: 50,
            callout: {
              content: `当前设备\n经度: ${longitude}\n纬度: ${latitude}`,
              color: '#FF0000',
              fontSize: 14,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000000',
              padding: 10,
              display: 'ALWAYS'
            }
          })
        });
        that.sendLocationToServer(latitude, longitude);
      }
    });
  },

  sendLocationToServer: function(latitude, longitude) {
    const recvTime = this.getCurrentFormattedTime();
    let sql = `insert into gps_realtime(device_type, device_id, latitude, longitude, gps_time, recv_time, data_source) values(
      'mobile','2022141461040', ${latitude}, ${longitude}, '${recvTime}', '${recvTime}', 'xcx')`;
      console.log(sql);
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',
      data: { "action": "update_record", "sql": sql, "db_name": "webyykf2024" },
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
      success(res) {
        console.log('Location sent successfully:', res);
      },
      fail(err) {
        console.error('Failed to send location:', err);
      }
    });
  },

  startLocationUpdates: function() {
    const that = this;
    setInterval(() => {
      that.getLocation();
      this.queryDataFromServer();
    }, 10000); // 每10秒获取一次位置
  },

  queryDataFromServer: function() {
    let that = this;
    let sql = "select * from gps_realtime";
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',
      data: { "action": "query_record", "sql": sql, "db_name": "webyykf2024" },
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
      success(res) {
        console.log('Raw response data:', res); // 调试打印原始返回数据
        var data = res.data.aaData || []; // 从 res.data.aaData 中提取数据
        console.log('Extracted data:', data); // 调试打印提取后的数据
        that.updateMarkers(data);
        wx.showToast({
          title: '查询到了记录',
          icon: 'none',
        });
      },
      fail(err) {
        wx.showToast({
          title: '执行操作发生错误：' + err,
          icon: 'none',
        });
      }
    });
  },

  updateMarkers: function(data) {
    const markers = data.map((item, index) => {
      return {
        id: index + 1,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: '/images/zuobiaofill.png',
        width: 50,
        height: 50,
        // callout: {
        //   content: `设备ID: ${item.device_id}\n经度: ${item.longitude}\n纬度: ${item.latitude}`,
        //   color: '#FF0000',
        //   fontSize: 14,
        //   borderRadius: 10,
        //   borderWidth: 2,
        //   borderColor: '#000000',
        //   padding: 10,
        //   display: 'ALWAYS'
        // }
      };
    });
    this.setData({
      markers: markers
    });
  },

  // 获取当前时间
  getCurrentFormattedTime: function() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
});


//   //获取当前时间
//   getCurrentFormattedTime: function() {
//     const date = new Date();
//     const year = date.getFullYear();
//     const month = ('0' + (date.getMonth() + 1)).slice(-2);
//     const day = ('0' + date.getDate()).slice(-2);
//     const hours = ('0' + date.getHours()).slice(-2);
//     const minutes = ('0' + date.getMinutes()).slice(-2);
//     const seconds = ('0' + date.getSeconds()).slice(-2);
//     return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//   }
// });
