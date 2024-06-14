// pages/todo/todo_modify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    device_id:"",
    device_name:"",
    create_time:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options.record);
    var record = JSON.parse(options.record);
    this.setData({
      id: record.id,
      device_id: record.device_id,
      device_name: record.device_name,
      create_time: record.create_time,
    }); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  applySubmit:function(){
    let that = this;
    wx.showModal({
      title: '提示',
      content: '你确认要修改这条记录吗？',
      success: function(res){
        if(res.confirm){
          var id = that.data.id;
          var device_id = that.data.device_id;
          var device_name = that.data.device_name;
          var create_time = that.data.create_time;
          console.log(id);
          console.log(device_id);
          console.log(device_name);
          console.log(create_time);
          wx.request({
            url: 'http://localhost:9988/TeachDemo_war_exploded/project_todo_servlet_action?action=modify_todo_record',
            data:{
            "id":id, 
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
        }
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