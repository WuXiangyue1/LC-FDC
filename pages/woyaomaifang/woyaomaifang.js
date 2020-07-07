const db = wx.cloud.database()
const years = ["请选择","毛坯","普装","简装","中装","精装","豪装"]
const months = []
const days = []

for (let i = 0; i <= 10; i++) {
  if(i == 0){
    months.push("请选择")
  }else{
    months.push(i+"房")
  }
  
}

for (let i = 0; i <= 10; i++) {
  if(i == 0){
    days.push("请选择")
  }else{
    days.push(i+"厅")
  }
  
}

Page({
  data: {
    years:years,
    year:"请选择>",
    months: months,
    month: '请选择>',
    days: days,
    day: '',
    tee:false,
    te:false,
  
  
  },
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
  
  bindChange: function (e) {
    console.log("eeeee",e)
    const val = e.detail.value
    this.setData({
      month: this.data.months[val[0]],
      day: this.data.days[val[1]],
    })
    
   
  },
  bindChange1: function (e) {
    const vall = e.detail.value
    this.setData({
      year: this.data.years[vall]
    })


  },
  clickMe: function () {
    this.setData({
      tee: !this.data.tee,
      te:false
    })
  },
  clickMe1: function () {
    this.setData({
      te: !this.data.te,
      tee:false
    })
  },
  close:function(){
    this.setData({
      tee: false,
      te:false
    })
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime()
    
    
  
  },
  getPhone(e){
    this.setData({
      phone:e.detail.value
    })

  },
  getName(e){
    this.setData({
      name:e.detail.value
    })
  },
  getLocal(e){
    this.setData({
      local:e.detail.value
    })
  },
  getMin(e){
    this.setData({
      min:e.detail.value
    })
  },
  getMax(e){
    this.setData({
      max:e.detail.value
    })
  },
  getArea(e){
    this.setData({
      area:e.detail.value
    })
  },
  
  go:function(){
    var time = this.data.time
    var phone = this.data.phone
    var name = this.data.name
    var local = this.data.local
    var budget = this.data.min+'~'+this.data.max
    var houseType = this.data.month+this.data.day
    var area = this.data.area
    var renovation = this.data.year
    db.collection('buyHouse').add({
      data:{
        phone:phone,
        name:name,
        local:local,
        budget:budget,
        houseType:houseType,
        area:area,
        renovation:renovation,
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
  
  }
})