//2023.11.22
//这个页面演示了www.ylxteach.net提供的数据库接口，微信小程序对接是怎么用的
//本页面演示了CRUD四个操作，其中“增删改”是调用update_record接口，“查”调用的是query_record接口
//这四个接口除了data参数里的action有的是query_record，有的是update_record外，还有sql语句不同以外，其他都大体一样的
//query_record的返回是数据表记录，update_record的返回就只有一个成功与否的标志
//header是固定这样写的，平台特殊要求，照抄就行了
//url是固定这样写，专用于www.ylxteach.net
//data里的db_name是数据库名称，如果用这个平台里别的数据库，比如：ydbc2023或者yjykfsj2023，就对应改成："db_name":"ydbc2023",或者"db_name":"yjykfsjj2023"
//sql自行根据数据库里的数据表来编写增删改查的sql语句
Page({
  data: {
    content:'',   //用来显示和平台交互后返回的结果
  },
  onLoad: function (options) {
  },
  //add(),delete(),modify(),query()四个函数分别对应wxml页面的四个按钮
  add: function (e) {
    let that=this;
    let sql="insert into device_file(device_id,device_name,device_type) values('DV2023020932848AA','安装于大门口的传感器','sensor')";
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',                                   //url是用这个网站的WebService的话就固定这样写
      data:{"action":"update_record","sql":sql,"db_name":"test"},                                             //需要三个参数：action、sql和db_name
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},  //这个是本接口特殊要求，照抄即可
      success:function(res){
        var data=res.data;
        console.log(data);
        that.setData({content:JSON.stringify(data)});
        wx.showToast({
          title: '记录添加完毕！',
          icon:'none',
        })
      },
      fail:function(res){
        wx.showToast({
          title: '执行操作发生错误：'+res,
          icon:'none',
        })
      }
    })
  },
  delete: function (e) {
    let that=this;
    let sql="delete from device_file where device_name like '%摄像头%'";
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',                                   //url是用这个网站的WebService的话就固定这样写
      data:{"action":"update_record","sql":sql,"db_name":"test"},                                             //需要三个参数：action、sql和db_name
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},  //这个是本接口特殊要求，照抄即可
      success:function(res){
        var data=res.data;
        console.log(data);
        that.setData({content:JSON.stringify(data)});
        wx.showToast({
          title: '记录删除完毕！',
          icon:'none',
        })
      },
      fail:function(res){
        wx.showToast({
          title: '执行操作发生错误：'+res,
          icon:'none',
        })
      }
    })
  },
  modify: function (e) {
    let that=this;
    let sql="update device_file set device_name='安装于大门口的摄像头' where device_name like '%大门口的传感器%'";
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',                                   //url是用这个网站的WebService的话就固定这样写
      data:{"action":"update_record","sql":sql,"db_name":"test"},                                             //需要三个参数：action、sql和db_name
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},  //这个是本接口特殊要求，照抄即可
      success:function(res){
        var data=res.data;
        console.log(data);
        that.setData({content:JSON.stringify(data)});
        wx.showToast({
          title: '记录修改完毕！',
          icon:'none',
        })
      },
      fail:function(res){
        wx.showToast({
          title: '执行操作发生错误：'+res,
          icon:'none',
        })
      }
    })
  },
  query: function (e) {
    let that=this;
    let sql="select * from device_file";
    wx.request({
      url: 'http://www.ylxteach.net/teach-demo/device_file_servlet_action',                                   //url是用这个网站的WebService的话就固定这样写
      data:{"action":"query_record","sql":sql,"db_name":"test"},                                              //需要三个参数：action、sql和db_name
      header: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest",},  //这个是本接口特殊要求，照抄即可
      success:function(res){
        var data=res.data;
        console.log(data);
        that.setData({content:JSON.stringify(data)});
        wx.showToast({
          title: '查询到了记录',
          icon:'none',
        })
      },
      fail:function(res){
        wx.showToast({
          title: '执行操作发生错误：'+res,
          icon:'none',
        })
      }
    })
  },
})