// pages/todo/todo_add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id:"",
    device_name:"",
    create_time:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  },
  applySubmit:function(){
    let that = this;
    var device_id = that.data.device_id;
    var device_name = that.data.device_name;
    var create_time = that.data.create_time;
    console.log(device_id);
    console.log(device_name);
    console.log(create_time);
    wx.request({
      url: 'http://localhost:9988/TeachDemo_war_exploded/project_todo_servlet_action?action=add_todo_record',
      data:{
      "device_id":device_id,
      "device_name":device_name,
      "create_time":create_time
     },
      header:{"content-type":"application/x-www-form-urlencoded","x-requested-with":"XMLHttpRequest"},
      success:function(res){
        wx.navigateBack({});
      },
      fail:function(res){

      }
    })
  },

  inputdevice_id:function(e){
    this.setData({
      device_id:e.detail.value,
    })
},
inputdevice_name:function(e){
  this.setData({
    device_name:e.detail.value,
  })
},
inputcreate_time:function(e){
this.setData({
  create_time:e.detail.value,
})
}
})