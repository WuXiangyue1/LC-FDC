const years = ["请选择","毛坯", "普装", "简装", "中装", "精装", "豪装"]
const months = []
const days = []
const db = wx.cloud.database()
for (let i = 1; i <= 10; i++) {
  months.push(i + "房")
}

for (let i = 1; i <= 10; i++) {
  days.push(i + "厅")
}

Page({
  data: {
    years: years,
    year: "请选择>",
    months: months,
    month: '请选择>',
    days: days,
    day: '',
    tee: false,
    te: false,
    images: [],
    imageList: [],
   
    
  },

  showview: function() { 
    this.setData({
      display: "block"
    })
  },
  hideview: function() {
    this.setData({
      display: "none"
    })

  },
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      month: this.data.months[val[0]],
      day: this.data.days[val[1]],
    })


  },
  bindChange1: function(e) {
    const vall = e.detail.value
    this.setData({
      year: this.data.years[vall[0]]
    })


  },
  uploadImg:function(){
    var that = this
    // 选择图片
    wx.chooseImage({
      count: 8,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths);
        //拼接之前存在的图片
        that.setData({
          images: that.data.images.concat(tempFilePaths)
        })
       

      },
      fail: e => {
        console.error(e)
      }
    })
  },

  previewImg:function(e){
    console.log(e)
    var src = e.currentTarget.dataset.img
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [] // 需要预览的图片http链接列表
    })
  },
  clickMe: function() {
    this.setData({
      tee: !this.data.tee,
      te: false
    })
  },
  clickMe1: function() {
    this.setData({
      te: !this.data.te,
      tee: false,
      
    })
  },
  close: function() {
    this.setData({
      tee: false,
      te: false
    })
  },

  formSubmit:function(e){
    var time = this.data.time
    console.log(e)
    var message = e.detail.value
    db.collection('sellHouse').add({
      data:{
        phone:message.phone,
        name:message.name,
        local:message.local,
        floor:message.floor,
        price:message.price,
        type:message.type,
        area:message.area,
        renovation:message.renovation,
        time:time
      },
      success: res =>{
        wx.showToast({
          title: '委托成功',
        })
      },
      fail: err =>{
        wx.showToast({
          title: '提交失败，请电话联系',
        })
      }
    })
  },

  getTime:function(){
    let that = this
    wx.cloud.callFunction({
      name: "getTimeToMin",
      data: {},
      success(res) {
        var time = res.result.time
        that.setData({
          time:time
        })
        
      }
    })
  
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getTime()
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '爱尚房',
      path: "pages/sellHouse/sellHouse"
    }
  },


  chooseImage: function(e) {
    let _this = this,
      index = e.currentTarget.dataset.index,
      imageList = _this.data.imageList;
 
    // 选择图片
    wx.chooseImage({
      count: 8 - imageList.length,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        _this.setData({
          imageList: imageList.concat(res.tempFilePaths)
        });
      }
    });
  },

  /**
   * 删除图片
   */
  deleteImage: function(e) {
    let dataset = e.currentTarget.dataset,
      imageList = this.data.imageList;
    imageList.splice(dataset.imageIndex, 1);
    this.setData({
      imageList
    });
  },
})