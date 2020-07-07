// pages/details/details.js
const app = getApp()
Page({
  data: {
    ellipsis:true,
    name: '',
    address: '',
    latitude: '',
    longitude: '',
    imgArr: [
      'http://a3.qpic.cn/psb?/V10e6ejl0ETYD9/V8bCTLrFNTyUNRmjZCmgsJHW8.nWsMxdP9Oos4YJ*Hc!/m/dL4AAAAAAAAAnull&bo=oAU4BKAFOAQRCT4!&rf=photolist&t=5',
      'http://a3.qpic.cn/psb?/V10e6ejl0ETYD9/eBt5.A*X84oFGo8Tu*F7.aT1gTKG3rYpXR.umbNm*l4!/m/dLYAAAAAAAAAnull&bo=oAU4BKAFOAQRCT4!&rf=photolist&t=5',
      'http://a4.qpic.cn/psb?/V10e6ejl0ETYD9/.BUmTGzJh9p7S5.CXvlp3adqaoDVjZYiXskSSzgH9nM!/m/dIMAAAAAAAAAnull&bo=oAU4BKAFOAQRCT4!&rf=photolist&t=5'
    ],
    imgHuxingArr: [
      'http://pic2.to8to.com/home/a6/b1/a6b103eade4ff7f146ada6200a445c08_s.jpg',
    ],
    indicatorDots:false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    circular: true,
    tit:'碧桂园  领秀海',
    zhuangtai:'在售',
    other_name: '俊发城',
    other: ['优惠打折', '小户型', '低总价'],
    prices: '11000-15000元/㎡',
    leixing: '公寓,住房',
    xiangmu: '观山湖区 北二环',
    huxing: '1室1厅',
    fangxiang: '公寓/100㎡/东南',
    pri: '100万',
   kfs:'中山市越秀地产开发有限公司',
   wygs:'广州市越秀物业管理有限公司',
   jzlx:'高层',
   kprq:'2018/04/11',
   jlrq:'2020/01/01',
   cqnx:'40',
   zdmj:'137763㎡',
   rjl:'3',
   lhl:'35%',
   wyzs:'5',
   zwzs:'953',
    jianjie:'碧桂园~领秀海是俊发地产在中山的一号作品，项目位于北二环15000亩4A级长坡岭国家森林公园旁，距离市级 、会展 、金融 三大 仅5分钟的车程，距省 10分钟的车程，距机场20分钟车程，出则繁华入则宁静。总占地2160亩，建筑面积220万方，分为南北两个地块开发。北倚长坡岭国家森林公园，南距高铁北站仅1.5公里；东面规划大型公交枢纽，将会有16余条线路在此首发，覆盖全市。',
    bac:'http://a3.qpic.cn/psb?/V14a5AtA1zaehb/AVslTQ*T7L*jRb9psfDGQxNU8QxXL8E00tInfVxptcc!/m/dLYAAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5',
    soucang:'收藏',
     a:0,
     imgHuxingArr:['cloud://lc-123.6c63-lc-123-1302387095/test/2.jpg','cloud://lc-123.6c63-lc-123-1302387095/test/1.jpg','cloud://lc-123.6c63-lc-123-1302387095/test/2.jpg'],
     address:"中山市电子科技大学中山学院"


  },
  shoucang:function(){
     
     if( this.data.a == 0){
        this.setData({
          bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/AVslTQ*T7L*jRb9psfDGQxNU8QxXL8E00tInfVxptcc!/m/dLYAAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
          soucang: '收藏',
           
        })
        this.data.a = 1;
     }
     else{
        this.setData({
          bac: "http://a3.qpic.cn/psb?/V14a5AtA1zaehb/e4f5BF6RQmMeJdBnKlpwwwQuMJDJy*dfL7WEO9j7CPw!/m/dL4AAAAAAAAAnull&bo=yADIAAAAAAADByI!&rf=photolist&t=5",
          soucang: '已收藏',
           
        })
        this.data.a = 0;
     }
     

  },
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
   
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  //电话联系
  
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
    if (res.from === 'button') {
      console.log(res.target)
    }
    var me = this;
    return {
      title: '尚居乐',
      path: "pages/index1/index1"
    }
  },
  goVR: function () {
    console.log("111")
    wx.navigateTo({
      url: '../out/out?url=https://www.kuleiman.com/124265/index.html?from=singlemessage&isappinstalled=0&scene=1&clicktime=1591777770&enterid=1591777770',
    })
  },
})
