const db = wx.cloud.database()
const app = getApp()
const {
  formatTime
} = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
     
      //判断当前微信版本能否用getUserInfo
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    let isPhone = app.getGlobalPhone()
    if(isPhone != null && isPhone != undefined && isPhone != ''){
      wx.switchTab({
        url: '/pages/index1/index1'
      })
    }


  },





 


  



  

  



  getPhoneNumber:function (e) {
    var that = this;
    wx.cloud.callFunction({
       name:'getMobile',
       data:{
        weRunData: wx.cloud.CloudID(e.detail.cloudID),
       }
    }).then(res =>{
      app.setGlobalPhone(res.result)
      db.collection('phone').add({
        data:{
          phone:res.result,
          createTime: formatTime(new Date())
        }
      })
      wx.switchTab({
        url: '/pages/index1/index1'
      })
    }).catch(err =>{
      console.error(err);
    })
  },
  onShareAppMessage: function () {
    if (res.from === 'button') {
      console.log(res.target)
    }
    var me = this;
    return {
      title: '爱尚房',
      path: "pages/getPhone/getPhone"
    }
  }
})