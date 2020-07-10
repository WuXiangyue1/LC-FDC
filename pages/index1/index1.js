//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
Page({
  data: {
    swiperImgUrls: [
    ],
    averageNumber:"",
    averagePrice:"",
    pageIndex:1,
    pageSize:10,
    hourseList:[],
    hasMore:"",
    msgList: [
      { url: "url", title: "佛山租房和无房提取住房公积金标准不变 无房提取最高6930元/年" },
      { url: "url", title: "房地产融资阀门收紧后，6.8万亿到期债务考验房企资金链" },
      { url: "url", title: "北大资源合唱团出国演出遇尴尬:被要求给他人伴唱" }],
    swiperCurrent: 0,
    zushou: [
      'woyaomaifang',
      'sellHouse',
      'zufang',
      'woyaozufang'
    ],
    salelist: [{
      sale_title: '我要买房',
      sale_describel: '专业评估报价',
      sale_pic: '/images/cuzu.png'
    },
    
    {
      sale_title: '我要卖房',
      sale_describel: '为你快速匹配',
      sale_pic: '/images/sale.png'
    },
    // {
    //   sale_title: '我要出租',
    //   sale_describel: '平台快速上架',
    //   sale_pic: '/images/zufang.png'
    // },
    // {
    //   sale_title: '我要租房',
    //   sale_describel: '好房等你来租',
    //   sale_pic: '/images/yishou.png'
    // }
    ],
  },
 
 
  onLoad: function () {
    this.getHeadList();
    this.getAverage();
    this.getAllHourseList();

    // wx.checkSession({
    //   success () {
    //     console.log("111")
    //   },
    //   fail () {
    //     // session_key 已经失效，需要重新执行登录流程
    //     //wx.login() //重新登录
    //     console.log("2121")
    //     wx.showModal({
    //       title: '请登录',
    //     })
    //   }
    // })

  

  },
  getScanning:function(){
    wx.navigateTo({
      url: '../mortgage/mortgage',
    })
  },
  getshuifeijisuanqi:function(){
    wx.navigateTo({
      url: '../shuifeijisuanqi/shuifeijisuanqi',
    })
  },
  callPhone:function(){
    wx.showModal({
      title: '是否要拨打13726272948',
      success:function(res){
        if (res.confirm) {
          console.log('用户点击确定')
          wx.makePhoneCall({
            phoneNumber: '13726272948' //仅为示例，并非真实的电话号码
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
       
      }
    })
   
  },
  //从云数据库获取头条列表数据
  getHeadList:function() {
    var that = this;
    db.collection('hearImage').get({
      success:res => {
        console.log(res);
        that.setData({
          swiperImgUrls:res.data
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  },

  getAverage:function() {
    var that = this;
    db.collection('average').get({
      success:res => {
        console.log(res);
        that.setData({
          averageNumber:res.data[0].average_number,
          averagePrice:res.data[0].average_price,
        })
      },
      fail: err => {
        console.log(err);
      }
    })
    
  },
  getAllHourseList:function(pageIndex,pageSize){
    var that = this;
    wx.showLoading({
      title: '请等待，加载中',
    })
    wx.cloud.callFunction({
      name:'paginators',
      data:{
        dbName:"hourseList",
        pageIndex:pageIndex,
        pageSize:pageSize,
        filter:{
         
        }
      }
    }).then(res=>{
      console.log(res)
      wx.hideLoading();
      // 刷新完成后关闭特效
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      //判断当前页page是否是第一页，如果是第一页，则清空videoList
      if (pageIndex === 1) {
        that.setData({
          hourseList: []
        })
      }
      var hourseList = res.result.data;
      var newHourseList = that.data.hourseList;
      that.setData({
        hourseList : newHourseList.concat(hourseList),
        pageIndex : pageIndex,
        hasMore:res.result.hasMore,
      })
    })
  },
  onReachBottom:function(){
   var that = this;
   //判断当前页数和总页数是否相等，如果相等则无需查询
   var hasMore = that.data.hasMore;
   if(hasMore){
     //获取当前页数
    var currentPage = that.data.pageIndex;
     var pageIndex = currentPage + 1;
     var pageSize = that.data.pageSize;
     that.getAllHourseList(pageIndex,pageSize);

   }else{
    wx.showToast({
      title: '已经没有数据啦~~',
      icon:"none",
      duration:1000
    })
    return;
   }
  },

  woyaozufang: function () {
    wx.showModal({
      content: '该功能尚未开放',
    })
    
  },
  zufang: function () {
    wx.showModal({
      content: '该功能尚未开放',
    })
  },
  sellHouse: function () {
    wx.navigateTo({
      url: "/pages/sellHouse/sellHouse"
    })
  },

  woyaomaifang: function () {
    wx.navigateTo({
      url: "/pages/woyaomaifang/woyaomaifang"
    })
  },
  information_details: function () {
    wx.navigateTo({
      url: "/pages/information_details/information_details?id=f2a60d815ee083990078d85274cfe629"
    })
  },

  weituo: function () {
    wx.navigateTo({
      url: "/pages/weituoguanli/weituoguanli"
    })
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
