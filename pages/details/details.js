const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    ellipsis:true,
    address: '',
    
    imgArr: [],
    
    bac:'http://a3.qpic.cn/psb?/V14a5AtA1zaehb/AVslTQ*T7L*jRb9psfDGQxNU8QxXL8E00tInfVxptcc!/m/dLYAAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5',
    soucang:'收藏',
     imgHuxingArr:[],
     address:"",
    information:'',

  },
  // shoucang:function(){
     
  //    if( this.data.a == 0){
  //       this.setData({
  //         bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/AVslTQ*T7L*jRb9psfDGQxNU8QxXL8E00tInfVxptcc!/m/dLYAAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
  //         soucang: '收藏',
           
  //       })
  //       this.data.a = 1;
  //    }
  //    else{
  //       this.setData({
  //         bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/e4f5BF6RQmMeJdBnKlpwwwQuMJDJy*dfL7WEO9j7CPw!/m/dL4AAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
  //         soucang: '已收藏',
           
  //       })
  //       this.data.a = 0;
  //    }
     

  // },
  previewImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgArr = this.data.imgArr;
    wx.previewImage({
      current: imgArr[index],     //当前图片地址
      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  previewHuxingImg: function (e) {
    console.log(e.currentTarget.dataset.index);
    var index = e.currentTarget.dataset.index;
    var imgHuxingArr = this.data.imgHuxingArr;
    wx.previewImage({
      current: imgHuxingArr[index],     //当前图片地址
      urls: imgHuxingArr,               //所有要预览的图片的地址集合 数组形式
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  ellipsis: function () {
    var value = !this.data.ellipsis;
    this.setData({
      ellipsis: value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var id = options.id
    console.log("id",id)
    that.getInformationById(id)
    
   
  },
  getInformationById(id) {
    var that = this
    db.collection('hourseList').where({
      _id: id
    }).get({
      success(res) {
        console.log("information:", res.data)
        that.setData({
          information: res.data[0],
          address: res.data[0].address,
          imgArr: res.data[0].urls,
          tags: res.data[0].tags,
          imgHuxingArr: res.data[0].imageUrls,
        })
        that.readTxt(res.data[0].txtUrl)
      },
      fail(err) {
        console.log("err fail", err)
      }
    })

  },

  readTxt: function (url) {
    //读取txt文件
    wx.cloud.downloadFile({
      fileID: url
    }).then(res => {
      var that = this
      console.log(res)
      var fs = wx.getFileSystemManager()
      var result = fs.readFileSync(res.tempFilePath, "utf-8")

      that.setData({
        txtContent: result,
      })
    }).catch(error => {
      console.log(error)
    })
  },
  getLocation: function () {
    var that = this;
    // 引入SDK核心类
    var QQMapWX = require('../zufang_detail/js/qqmap-wx-jssdk.min');

    // 实例化API核心类
    var demo = new QQMapWX({
      key: 'S2IBZ-LM7CF-CR6JS-NH7XB-GUFNJ-EUFJT' // 必填
    });
    // 调用接口
    demo.geocoder({
      address: this.data.address,
      success: function (res) {
        console.log(res);
        that.setData({
          latitude: res.result.location.lat,
          longitude: res.result.location.lng
        })
        wx.openLocation({
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          scale: 15,
          name: that.data.address,
        })
      },
      fail: function (res) {
        console.log(res);
      },
    })
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
      path: "pages/index1/index1"
    }
  },
  
})

