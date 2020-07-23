// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vrList:[],
    pageIndex: 1,
    pageSize: 3,
    hasMore: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pageIndex = this.data.pageIndex;
    var pageSize = this.data.pageSize;
    this.getAllVrList(pageIndex,pageSize);

  },


  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  
  getAllVrList: function (pageIndex, pageSize) {
    var that = this;
    wx.showLoading({
      title: '请等待，加载中',
    })
    wx.cloud.callFunction({
      name: 'paginators',
      data: {
        dbName: "vrList",
        pageIndex: pageIndex,
        pageSize: pageSize,
        filter: {

        }
      }
    }).then(res => {
      console.log(res)
      wx.hideLoading();
      // 刷新完成后关闭特效
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      //判断当前页page是否是第一页，如果是第一页，则清空videoList
      if (pageIndex === 1) {
        that.setData({
          vrList: []
        })
      }
      var vrList = res.result.data;
      var newVrList = that.data.vrList;
      that.setData({
        vrList: newVrList.concat(vrList),
        pageIndex: pageIndex,
        hasMore: res.result.hasMore,
      })
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    //判断当前页数和总页数是否相等，如果相等则无需查询
    var hasMore = that.data.hasMore;
    if (hasMore) {
      //获取当前页数
      var currentPage = me.data.pageIndex;
      var pageIndex = currentPage + 1;
      var pageSize = me.data.pageSize;
      that.getAllVrList(pageIndex, pageSize);

    } else {
      wx.showToast({
        title: '已经没有数据啦~~',
        icon: "none",
        duration: 1000
      })
      return;
    }
  },

  /**
   * 用户点击右上角分享
   */
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