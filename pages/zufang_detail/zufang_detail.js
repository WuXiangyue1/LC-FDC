const db = wx.cloud.database()
const app = getApp()
Page({
  data: {
    //swiper参数
    ellipsis: true,
    // indicatorDots: false,
    // autoplay: true,
    // interval: 3000,
    // duration: 1000,
    // circular: true,
  
    
    collectData:'',
    soucang: '收藏',
    address:"",
    information:"",
    imgArr:[]
 


  },
  // shoucang: function () {

  //   if (this.data.a == 0) {
  //     this.setData({
  //       bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/AVslTQ*T7L*jRb9psfDGQxNU8QxXL8E00tInfVxptcc!/m/dLYAAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
  //       soucang: '收藏',

  //     })
  //     this.data.a = 1;
  //     wx.showToast({
  //       title: '已取消收藏',
  //       duration: 2000
  //     })
  //   }
  //   else {
  //     this.setData({
  //       bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/e4f5BF6RQmMeJdBnKlpwwwQuMJDJy*dfL7WEO9j7CPw!/m/dL4AAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
  //       soucang: '已收藏',

  //     })
  //     this.data.a = 0;
  //     wx.showToast({

  //       title: '收藏成功',

  //       icon: 'success',

  //       duration: 2000

  //     })
  //   }


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
  zufang_detail: function () {
    console.log("111")
    wx.navigateTo({
      url: '../out/out?url=https://www.kuleiman.com/124265/index.html?from=singlemessage&isappinstalled=0&scene=1&clicktime=1591777770&enterid=1591777770',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id = options.id;
    console.log(id)
    that.setData({
      collectData: id
    })
    that.getCollected();
    that.getInformationById(id)
   
    
       
       

      
    

  },
  getCollected() {
    let CollectState = wx.getStorageSync("_collect");//获取全部文章缓存状态
    //这里我们做一个判断，如果缓存中有这个值，取到id对应在缓存中的状态，存到data中，
    //如果没有这个值，把id对应在缓存中的状态设置为false
    if (CollectState) {// 判断如果缓存中有这个值 
      // 获取当前文章对应在缓存中的状态
      let collcetState = CollectState[this.data.collectData];
      this.setData({
        isShow: collcetState//把这个状态存到data中
      })
    } else {
      let CollectState = {};
      CollectState[this.data.collectData] = false;//没有这个值，默认把点赞的这个状态设置为false，
      // 当然不设置false，它默认也是false，未选中的状态
      wx.setStorageSync("_collect", CollectState);
    }
  },
  getLocation: function () {
    var that = this;
    // 引入SDK核心类
    var QQMapWX = require('./js/qqmap-wx-jssdk.min.js');

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
  shoucang: function (e) {
    // 获取当前缓存中的所有状态
    let getSecCollect = wx.getStorageSync("_collect");
    // 获取当前页面的收藏按钮的状态 this.data.collectData就是当前的页面的id，在data中存储的
    let getSecCollectState = getSecCollect[this.data.collectData];

    // 然后当前收藏按钮的状态取反
    getSecCollectState = !getSecCollectState;
    // 把取反的值的状态 在赋给 当前按钮的状态
    getSecCollect[this.data.collectData] = getSecCollectState;
    wx.setStorageSync("_collect", getSecCollect)//在缓存中设置改变之后的状态
    this.setData({
      isShow: getSecCollectState//把更新过的收藏按钮的状态赋值给isShow
    })
    if (!this.data.isShow == true) {
      wx.showToast({

        title: '已收藏',

      });

    } else {
      wx.showToast({

        title: '已取消收藏',

      });
    }
    },

  getInformationById(id){
    var that = this
    db.collection('VRList').where({
      _id: id 
    }).get({
      success(res){
        console.log("information:",res.data)
        that.setData({
          information:res.data[0],
          address:res.data[0].address,
          imgArr:res.data[0].picUrls,
          tags:res.data[0].tags,
          imgHuxingArr:res.data[0].houseUrls,
        })
        that.readTxt(res.data[0].txtUrl)
      },
      fail(err){
        console.log("err fail",err)
      }
    })

  },


  readTxt:function(url){
   //读取txt文件
   wx.cloud.downloadFile({
    fileID:url
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
  }
})
