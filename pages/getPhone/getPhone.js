// pages/getPhone/getPhone.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      mobile:"",
      //判断当前微信版本能否用getUserInfo
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //登陆
  onLogin() {
    let that = this
    wx.login({
      success(res) {
        if (res.code) {
          api.getXcxUserInfo({
            code: res.code
          }).then(res => {
            that.setData({
              sessionKey: res.data.data.sessionKey
            })
          }).catch(err => {
            console.log('获取sessionKey失败')
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },


  // 获取手机号授权  
  getPhoneNumber(e) {
    let that = this
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
    wx.checkSession({
      success: function() {
        api.phoneAES({
          encrypData: e.detail.encryptedData,
          ivData: e.detail.iv,
          sessionKey: that.data.sessionKey
        }).then(res => {
          console.log(JSON.parse(res.data.data).phoneNumber) 
          that.setData({
            phone: JSON.parse(res.data.data).phoneNumber
          })
          api.login({
            userName: that.data.phone
          }).then(res => {
            wx.setStorageSync('token', res.data.data)
            wx.reLaunch({
              url: '../index/index'
            })
          }).catch(err => {
            console.log("获取token失败");
          })
        }).catch(err => {
          console.log("拒绝登录");
          wx.hideLoading()
          wx.showModal({
            title: '提示',
            content: 'BD小助手需要微信授权登录才能正常使用，请授权！',
            showCancel: false
          }) 
        })
      },
      fail: function () {
        console.log("获取wx.checkSession接口失败");
      }
    })
  },

  // getPhoneNumber:function (e) {
  //   var that = this;
  //   wx.cloud.callFunction({
  //      name:'getMobile',
  //      data:{
  //       weRunData: wx.cloud.CloudID(e.detail.cloudID),
  //      }
  //   }).then(res =>{
  //     that.setData({
  //       moblie:res.result
  //     })
  //   }).catch(err =>{
  //     console.error(err);
  //   })
  // }
})