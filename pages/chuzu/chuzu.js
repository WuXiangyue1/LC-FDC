const db = wx.cloud.database()
const _ = db.command
Page({
  data: {
    // 下拉菜单
    areaNmae: '区域',
    price: '均价',
    type: '户型',
    areaNum:0,
    price_num: 0,
    type_num: 0,
    searchName:'',

    pageIndex:1,
    pageSize:4,
    totalPage:1,
    VRHourseList:[],
    hasMore:"",

    
    rowLise: {
      zhongshan: { id: 0, name: ['不限','石岐', '东区', '南朗','西区','三乡','开发区','三角','古镇','板芙'] },
    
    },
  },
  isShow: true,
  currentTab: 0,
  onLoad: function (options) {
    this.getVRHourseList(this.data.pageIndex,this.data.pageSize)
    
    
  },
 
  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function (e) {
    this.setData({
      displays: "block"
    })
    this.setData({
      selected1: false,
      selected2: false,
      selected: true
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {

      var showMode = e.target.dataset.current == 0;

      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  
  
  

  // 区域
  clickArea: function (e) {

    this.setData({
      areaNmae: e.currentTarget.dataset.name,
      areaNum:e.currentTarget.dataset.num,
    })

    this.setData({
      displays: "none"
    })
    var that = this;
    
    console.log(e.currentTarget.dataset.num)
    console.log(e.currentTarget.dataset.name)
    that.getVRHourseList(1,that.data.pageSize);
    
  },
 
  
  
  
  
  
  // 区域模块市区街道隐藏/显示

  // 售价
  clickPrice: function (e) {
   
    this.setData({
      price: e.target.dataset.name,
      price_num: e.target.dataset.num
      
    })
   
    this.setData({
      displays: "none"
    })
   
    var that = this;
  
    
    console.log(e.target.dataset.name)
    console.log(e.target.dataset.num)
    that.getVRHourseList(1,that.data.pageSize);
    
    
  },
  
  // 户型
  clickType: function (e) {
    
    
    this.setData({
      type: e.target.dataset.name,
      type_num: e.target.dataset.num
    })
    this.setData({
      displays: "none"
    })
    var that = this;
   
    console.log(e.target.dataset.num)
    console.log(e.target.dataset.name)
    that.getVRHourseList(1,that.data.pageSize);
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
      that.getVRHourseList(pageIndex,pageSize);
 
    }else{
     wx.showToast({
       title: '已经没有数据啦~~',
       icon:"none",
       duration:1000
     })
     return;
    }
   },
  doSearch:function(e){
      console.log(e.detail.value)
      var that = this;
      that.setData({
        searchName:e.detail.value
      })
      that.getVRHourseList(1,that.data.pageSize);
  },
  getVRHourseList:function(pageIndex,pageSize){
    // http://www.imooc.com/article/295046
    var that = this;
    var areaName =  that.data.areaNmae;
    var areaNum = that.data.areaNum;
    var searchName = that.data.searchName;
    var localName = '中山';
    var type = that.data.type_num != 0 ? that.data.type : '';
    if(areaName != '不限' && areaNum != 0 && areaName != '区域'){
           localName = areaName
    }
    var price_num = that.data.price_num;
    if(price_num == 0 || price_num == 1){
      var start_price = 0
      var end_price = 100000
    }else if(price_num == 2){
      var start_price = 0
      var end_price = 5000
    }else if(price_num == 3){
      var start_price = 5000
      var end_price = 10000
    }else if(price_num == 4){
      var start_price = 10000
      var end_price = 15000
    }else if(price_num == 5){
      var start_price = 15000
      var end_price = 20000
    }else if(price_num == 6){
      var start_price = 20000
      var end_price = 25000
    }else if(price_num == 7){
      var start_price = 25000
      var end_price = 30000
    }else if(price_num == 8){
      var start_price = 30000
      var end_price = 100000
    }
    wx.showLoading({
      title: '请等待，加载中',
    });
     //获取集合中的总记录数
      db.collection('VRList').where(_.and([
      {
      name:db.RegExp({
        regexp:'.*'+searchName,
        options:'i',
      })
    },
    {
      local:db.RegExp({
        regexp:'.*'+localName,
        options:'i',
      })
    },
    {
      price:_.gt(start_price).and(_.lt(end_price)),
        
    },
    {
      type:db.RegExp({
        regexp:'.*'+type,
        options:'i',
      })
    }
  
  ])).count().then(res =>{
    console.log(res.total)
    const total = res.total // 得到总记录数
    const totalPage = Math.ceil(total / pageSize) //计算需要多少页
    
    var hasMore;//提示前端是否还有数据
    if(pageIndex > totalPage || pageIndex == totalPage){ //如果没有数据了，则返回false
      hasMore = false;
    }else{
      hasMore = true;
    }
    that.setData({
      hasMore:hasMore
    })
  });
 
    db.collection('VRList').where(_.and([
      {
      name:db.RegExp({
        regexp:'.*'+searchName,
        options:'i',
      })
    },
    {
      local:db.RegExp({
        regexp:'.*'+localName,
        options:'i',
      })
    },
    {
      price:_.gt(start_price).and(_.lt(end_price)),
        
    },
    {
      type:db.RegExp({
        regexp:'.*'+type,
        options:'i',
      })
    }
  
  ])).skip((pageIndex-1) * pageSize).limit(pageSize).get({
    success: res => {
      console.log(res)
      wx.hideLoading();
      // 刷新完成后关闭特效
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
      var that = this;
      //判断当前页page是否是第一页，如果是第一页，则清空videoList
      if (pageIndex === 1) {
        that.setData({
          VRHourseList: []
        })
      }
      var VRHourseList = res.data;
      var newVRHourseList = that.data.VRHourseList;
      that.setData({
        VRHourseList: newVRHourseList.concat(VRHourseList),
        pageIndex:pageIndex
      })
    },
    fail: err => {
      console.log(err)
    }
  })
  },

 

  // if不传入>= <=用此方法进行条件分页查询
  // getVRHourseList:function(pageIndex,pageSize){
  //   var that = this;
  //   wx.showLoading({
  //     title: '请等待，加载中',
  //   })
  //   var areaName =  that.data.areaNmae;
  //   var areaNum = that.data.areaNum;
  //   var searchName = that.data.searchName;
  //   var localName = '中山';
  //   var type = that.data.type_num != 0 ? that.data.type : '室';
  //   if(areaName != '不限' && areaNum != 0 && areaName != '区域'){
  //          localName = areaName
  //   }
  //   var price_num = that.data.price_num;
  //   if(price_num == 0 || price_num == 1){
  //     var start_price = 0
  //     var end_price = 100000
  //   }else if(price_num == 2){
  //     var start_price = 0
  //     var end_price = 5000
  //   }else if(price_num == 3){
  //     var start_price = 5000
  //     var end_price = 10000
  //   }else if(price_num == 4){
  //     var start_price = 10000
  //     var end_price = 15000
  //   }else if(price_num == 5){
  //     var start_price = 15000
  //     var end_price = 20000
  //   }else if(price_num == 6){
  //     var start_price = 20000
  //     var end_price = 25000
  //   }else if(price_num == 7){
  //     var start_price = 25000
  //     var end_price = 30000
  //   }else if(price_num == 8){
  //     var start_price = 30000
  //     var end_price = 100000
  //   }
  // //
  // wx.cloud.callFunction({
  //   name:'paginators',
  //   data:{
  //     dbName:"VRList",
  //     pageIndex:pageIndex,
  //     pageSize:pageSize,
  //     filter:{
       
        
  //       name:db.RegExp({
  //         regexp:'.*'+searchName,
  //         options:'i',
  //       }),
        
  //       local:db.RegExp({
  //         regexp:'.*'+localName,
  //         options:'i',
  //       }),
       
        
        
  //       type:db.RegExp({
  //         regexp:'.*'+type,
  //         options:'i',
  //       })

  //     }
  //   }
  // }).then(res=>{
  //   console.log(res)
  //     wx.hideLoading();
  //     // 刷新完成后关闭特效
  //     wx.hideNavigationBarLoading();
  //     wx.stopPullDownRefresh();
  //     //判断当前页page是否是第一页，如果是第一页，则清空videoList
  //     if (pageIndex === 1) {
  //       that.setData({
  //         VRHourseList: []
  //       })
  //     }
  //     var VRHourseList = res.result.data;
  //     var newVRHourseList = that.data.VRHourseList;
  //     that.setData({
  //       VRHourseList : newVRHourseList.concat(VRHourseList),
  //       pageIndex : pageIndex,
  //       hasMore:res.result.hasMore,
  //     })
  

  // })

  // },
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
