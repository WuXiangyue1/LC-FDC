const app = getApp()

Page({
  data: {
    
  },
  addwe : function(){
    wx.navigateTo({
      url: '../jiaruwomen/jiaruwomen',
      success: function(res) {
        console.log(res)
      },
      fail : function(){
        console.log("跳转失败")
      }
    })
  },
 
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      console.log(res.target)
    }
    var me = this;
    return {
      title: '尚居乐',
      path: "pages/index1/index1"
    }
  }
})