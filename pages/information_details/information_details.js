const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    informationDeatils:{},
    txtContent:"",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var id = options.id;
    console.log(id)
    this.getTxt(id)

  },
  getTxt:function(id){
    db.collection('news').doc(id).get({
      success:res => {
        this.setData({
          informationDeatils:res.data
        })
        
        console.log(res)
         //读取txt文件
        wx.cloud.downloadFile({
          fileID:res.data.txtUrl
        }).then(res =>{
          var that = this
          console.log(res)
          var fs = wx.getFileSystemManager()
          var result = fs.readFileSync(res.tempFilePath,"utf-8")
        
          that.setData({
            txtContent:result,
          })
        }).catch(error =>{
          console.log(error)
        })
      },
      fail: err => {
        console.log(err);
      }
    })
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