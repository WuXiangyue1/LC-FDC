Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAll:false,
    showBlank:true,
    showHourse:true,
    pageIndex:1,
    pageSize:4,
    currentData: 0,

    allList:[],
    blankList:[],
    floorList:[],
    navlist: [
      {
        name: '全部资讯'
      },
      {
        name: '银行政策'
      },
      {
        name: '楼市行情'
      },
    ],
    content: [
      {
        name:[{
          liebiao_title: '佛山租房和无房提取住房公积金标准不变 无房提取最高6930元/年',
          liebiao_time: '6-16 10:23',
          liulan: '522',
          liebiao_img: 'pic/slide3.jpg'
        },
          {
            liebiao_title: '房地产融资阀门收紧后，6.8万亿到期债务考验房企资金链',
            liebiao_time: '6-17 10:23',
            liulan: '22',
            liebiao_img: 'pic/slide2.jpg'
          }
        ]
      },
      {
        name: '分类1'
      },
      {
        name: '分类2'
      },
    ]
  },
  information_details:function(e){
    
    console.log(e.currentTarget.dataset.id)
  wx.navigateTo({
    url: '/pages/information_details/information_details?id='+e.currentTarget.dataset.id,
  })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllList(1,this.data.pageSize)
  },
  
 
  
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if(e.target.dataset.current == 0){
      that.setData({
        showAll:false,
        showBlank:true,
        showHourse:true,
      })
      that.getAllList(1,that.data.pageSize)
    }else if(e.target.dataset.current == 1){
      that.setData({
        showAll:true,
        showBlank:false,
        showHourse:true,
      })
      that.getblankList(1,that.data.pageSize)
     
    }else if(e.target.dataset.current == 2){
      that.setData({
        showAll:true,
        showBlank:true,
        showHourse:false,
      })
      that.getfloorList(1,that.data.pageSize)
      
    }
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },

  getAllList:function(pageIndex,pageSize){
    var that = this;
    wx.showLoading({
      title: '请等待，加载中',
    })
    wx.cloud.callFunction({
      name:'paginators',
      data:{
        dbName:"news",
        pageIndex:pageIndex,
        pageSize:pageSize,
        fieldName:'time',
        order:'desc',
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
          allList: []
        })
      }
      var allList = res.result.data;
      var newAllList = that.data.allList;
      that.setData({
        allList : newAllList.concat(allList),
        pageIndex : pageIndex,
        hasMore:res.result.hasMore,
      })
    })
  },
  getblankList:function(pageIndex,pageSize){
    var that = this;
    wx.showLoading({
      title: '请等待，加载中',
    })
    wx.cloud.callFunction({
      name:'paginators',
      data:{
        dbName:"news",
        pageIndex:pageIndex,
        pageSize:pageSize,
        fieldName:'time',
        order:'desc',
        filter:{
          type:1
         
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
          blankList: []
        })
      }
      var blankList = res.result.data;
      var newblankList = that.data.blankList;
      that.setData({
        blankList : newblankList.concat(blankList),
        pageIndex : pageIndex,
        hasMore:res.result.hasMore,
      })
    })
  },
  getfloorList:function(pageIndex,pageSize){
    var that = this;
    wx.showLoading({
      title: '请等待，加载中',
    })
    wx.cloud.callFunction({
      name:'paginators',
      data:{
        dbName:"news",
        pageIndex:pageIndex,
        pageSize:pageSize,
        fieldName:'time',
        order:'desc',
        filter:{
         type:2
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
          floorList: []
        })
      }
      var floorList = res.result.data;
      var newfloorList = that.data.floorList;
      that.setData({
        floorList : newfloorList.concat(floorList),
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
     
     var showAll = that.data.showAll
     var showBlank = that.data.showBlank
     var showHourse = that.data.showHourse
     if(!showAll){
      that.getAllList(pageIndex,pageSize);
     }else if(!showBlank){
      that.getblankList(pageIndex,pageSize);
     }else if(!showHourse){
      that.getfloorList(pageIndex,pageSize);
     }
     

   }else{
    wx.showToast({
      title: '已经没有数据啦~~',
      icon:"none",
      duration:1000
    })
    return;
   }
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
