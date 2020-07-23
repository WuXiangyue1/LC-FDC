// pages/my/my.js
const app = getApp()

Page({
  data: {
    hiddenLoading: false,
    phonenum: "13726272948",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // 点击次数记录
    TapAccount: 0
  },

  gongsijianjie: function () {
    wx.navigateTo({
      url: '/pages/gongsijianjie/gongsijianjie'
    })
  },
  jiaruwomen: function () {
    wx.navigateTo({
      url: '/pages/jiaruwomen/jiaruwomen'
    })
  },
  onLoad: function () {
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

   // 秘密入口
   ScanPage() {
    let TapAccount = this.data.TapAccount
    TapAccount = TapAccount + 1
    console.log(TapAccount)
    if (TapAccount < 5) {
        this.setData({
            TapAccount: TapAccount
        })
    } else {
        // 检查管理员身份
        this.IsAdminstator()
    }
},


 // 检查是否为管理员
 IsAdminstator() {
  wx.showLoading({
      title: '正在检验...',
      mask: true
  })
  let that = this
  wx.cloud.callFunction({
      name: 'InitInfo',
      data: {
          type: 'ADMIN'
      },
      success: res => {
          wx.hideLoading()
          console.log('adminres', res)
          if (res.result.total > 0) {
              that.setData({
                  Adminstator: true
              })
              console.log("app.globalData.userInfo",app.globalData.userInfo)
              // 管理员跳转到管理员页面
              var url = '../AdminPackage/managerHome/managerHome'
              var title = '进入管理员页面'
              var id = app.globalData.userInfo.nickName
          } else {
              // 不是管理员，跳转到扫码页面
              var url = '../AdminPackage/scanPage/scanPage'
              var title = '扫码'
              var id = 'mypage'
          }

          wx.showToast({
              title: title,
              icon: 'none'
          })
          that.setData({
              TapAccount: 0
          })
          wx.navigateTo({
              url: `${url}?id=${id}`,
              
          })
      },
      fail: err => {
          wx.hideLoading()
          console.log('err', err)
      }
  })
},
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //打电话  还是   添加到联系人
  viewClick: function () {
    var that = this
    //显示“呼叫”、“添加联系人”弹窗
    wx.showActionSheet({
      itemList: ['呼叫', '添加联系人'],
      success: function (res) {
        console.log("点击电话 res：", res)
        if (res.tapIndex == 0) {//直接呼叫
          wx.makePhoneCall({
            phoneNumber: that.data.phonenum,
            success: function (res_makephone) {
              console.log("呼叫电话返回：", res_makephone)
            }
          })
        } else if (res.tapIndex == 1) {//添加联系人
          wx.addPhoneContact({
            firstName: '吴总',
            mobilePhoneNumber: that.data.phonenum,
            success: function (res_addphone) {
              console.log("电话添加联系人返回：", res_addphone)
            }
          })
        }
      }
    })
  },
  onReady: function () {
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 1000)},

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