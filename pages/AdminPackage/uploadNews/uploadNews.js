const db = wx.cloud.database()
const {
  formatTime
} = require("../../../utils/time.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIds1: [],
   
   
    txtFilePaths: '',
    typeList:['银行政策','楼市行情'],
    typeName:'',


    // 渲染输入框
    InputList: [{
      'id': 'title',
      'title': '资讯题目:',
      'placeholder': '',
      'type': 'text',
      'maxlength': 100
    },
    ],




  
    // 表单数据
    FormData: {
      // 题目
      'title': '',
      'type':''
     
    



    },
    // 地图列表
    imgList1: [],
  
   
   
   
    
     
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
   
    


  },

  // 获取输入框数据
  InputData: function (e) {
    console.log(e, e.currentTarget.id, e.detail.value)
    let FormData = this.data.FormData
    let id = e.currentTarget.id
    let value = e.detail.value
    FormData[id] = value
    this.setData({
      FormData
    })
  },

  // 获取单列选择器数据
  PickerData(e) {
    console.log(e, e.currentTarget.id, e.detail.value)
    let FormData = this.data.FormData
    let id = e.currentTarget.id
    let value = e.detail.value
    let list = e.currentTarget.dataset.pickerlist
    FormData[id] = list[value]
    this.setData({
      FormData
    })
  },

  

  // 选择地图照片
  ChooseImage1() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList1.length != 0) {
          this.setData({
            imgList1: this.data.imgList1.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList1: res.tempFilePaths
          })
        }
      }
    });
  },

  // 预览地图照片
  ViewImage1(e) {
    wx.previewImage({
      urls: this.data.imgList1,
      current: e.currentTarget.dataset.url
    });
  },

  // 删除地图照片
  DelImg1(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList1.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList1: this.data.imgList1
          })
        }
      }
    })
  },



 

  

  


  
 

  

  

 

 




  

 




  

 
  



  // 上传图片
  UploadImages() {
    wx.showLoading({
      title: '保存图片...',
      mask: true
    })
    let that = this
    let imgPathList = []
    // 保存照片
    for (let i = 0; i < that.data.imgList.length; i++) {
      const fileName = that.data.imgList[i];
      const dotPosition = fileName.lastIndexOf('.');
      const extension = fileName.slice(dotPosition);
      const cloudPath = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}${extension}`;
      wx.cloud.uploadFile({
        cloudPath,
        filePath: fileName,
        success(res) {
          wx.hideLoading()
          console.log('imgs', res, imgPathList.length, that.data.imgList.length)
          imgPathList.push(res.fileID)
          if (imgPathList.length == that.data.imgList.length) {
            // 保存信息
            that.SubmitEntrust(imgPathList)
          }
        },
        fail: err => {
          wx.hideLoading()
          wx.showToast({
            title: '图片保存失败',
            icon: "none",
            duration: 1500
          })
        },
        complete: res => { }
      })
    }
  },

  

  

  chooseMessageFile: function () {
    var that = this
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['txt'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFiles
        console.log(res)
        console.log("tempFilePaths", tempFilePaths)
        that.setData({
          txtFilePaths: tempFilePaths,
          txtName: res.tempFiles[0].name
        })
      }
    })
  },

  // 提交信息前进行数据校验
  Submit(e) {
    let FormData = this.data.FormData

    //表单数据的校验
    for (let key in FormData) {
      if (FormData[key] == '') {
        wx.showToast({
          title: '请把所有数据填写完整',
          icon: 'none',
          mask: true,
          duration: 2000
        })
        return;
      }
    }
    wx.showLoading({
      title: '上传中~',
    })
    var that = this

    let p1 = new Promise((resolve1, reject) => {
      this.upload1(resolve1)
    })
    
    let p4 = new Promise((resolve4, reject) => {
      this.uploadTxT(resolve4)
    })
    Promise.all([p1, p4]).then(res => {
      console.log("res", res)
      console.log("数据全部上传完毕，执行数据库操作")
      let FormData = this.data.FormData
      db.collection('news').add({
        data: {
          title: FormData.title,
          type: FormData.type,
          coverUrl: this.data.fileIds1[0],                          headUrl:'cloud://lc-12.6c63-lc-12-1302665530/128656849685955003 (1).png',
          time: new Date(),
          createTime: formatTime(new Date()),
          txtUrl: this.data.txtUrl,
          author:"爱尚房"
        




        },
        success: res => {
          wx.hideLoading();
          wx.showToast({
            title: '上传成功',
          })

          // 页面跳转到成功页面
          wx.navigateBack({

          })
        },
        fail: err => {
          wx.hideLoading();
          wx.showToast({
            title: '上传失败，请联系管理员',
          })
        }
      })

    })







  },



  uploadTxT(resolve4) {
    console.log("TXT", this.data.txtFilePaths)
    let suffix = /\.\w+$/.exec(this.data.txtFilePaths[0].path); //正则表达式，返回文件扩展名
    let path = 'lc-fdc/news' + '/txt/'
    wx.cloud.uploadFile({
      cloudPath: path + new Date().getTime() + Math.random(1000, 9999) + suffix, // 上传至云端的路径
      filePath: this.data.txtFilePaths[0].path, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log(res.fileID)
        this.setData({
          txtUrl: res.fileID
        })
        console.log("TXT 成功")
        resolve4("txtOK")
      },
      fail: err => {
        console.log("TXT fail", err)
        wx.hideLoading()
        wx.showModal({
          title: '上传失败',
        })
      }
    })


  },
  upload1(resolve1) {
    // 上传地图图片
    console.log("up1", this.data.imgList1)
    let promiseArr = []
    for (let i = 0; i < this.data.imgList1.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgList1[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
        let path = 'lc-fdc/news' + '/hearImage/'
        wx.cloud.uploadFile({
          cloudPath: path + new Date().getTime() + Math.random(1000, 9999) + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds1: this.data.fileIds1.concat(res.fileID)
            })
            reslove()
          },
          fail: err => {
            wx.hideLoading()
            wx.showModal({
              title: '上传失败',
              content: err,
            })
          }
        })

      }))
    }
    Promise.all(promiseArr).then(res => {
      console.log("地图图片上传完毕")
      resolve1("地图ok")
    })

  },

 




  



  bindTypeChange:function(e){
     console.log(e)
    
    let FormData = this.data.FormData
    FormData.type = parseInt(e.detail.value) + 1
    this.setData({
      typeName: this.data.typeList[e.detail.value],
      FormData
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})