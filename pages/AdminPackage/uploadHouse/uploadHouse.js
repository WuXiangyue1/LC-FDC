const db = wx.cloud.database()
const {
  formatTime
} = require("../../../utils/util.js")


Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileIds1: [],
    fileIds2: [],
    fileIds3: [],
    txtFilePaths: '',

    // 渲染选择器
    PickerList: [
      {
      'id': 'type',
      'title': '房子户型',
      'pickerlist': ['1室1厅', '2室1厅', '3室1厅', '3室1厅','4室2厅','其他']
    }, 
    {
        'id': 'elevator',
        'title': '电梯情况',
      'pickerlist': ['有电梯', '无电梯']
      }, 
      {
        'id': 'decoration',
        'title': '装修情况',
        'pickerlist': ['全新毛坯房未入住', '简单精装','豪华装饰','精装配全屋家电']
      },
      {
        'id': 'car',
        'title': '车位情况',
        'pickerlist': ['私家车位', '地下车库','露天停车场','无车位']
      }, 
    ],

    // 房型选择列表
    localList: [
      ['中山'],
      ['石岐', '东区', '南朗', '西区', '三乡', '三角', '古镇', '板芙'],
      
    ],
    
    // 渲染输入框
    InputList: [
    {
      'id': 'area',
      'title': '房间面积:',
      'placeholder': '如:90',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'brief',
      'title': '简单描述:',
      'placeholder': '如:精装四口之家温馨户型，交通便利（20字内）',
      'type': 'text',
      'maxlength': 50
    },
    
      {
        'id': 'orientation',
        'title': '房屋朝向:',
        'placeholder': '如:30',
        'type': 'text',
        'maxlength': 50
      },
   
    
    {
      'id': 'floor',
      'title': '楼层:',
      'placeholder': '如:30',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'year',
      'title': '产权年限:',
      'placeholder': '如:30',
      'type': 'text',
      'maxlength': 50
    },
    
    {
      'id': 'greenRate',
      'title': '绿化率:',
      'placeholder': '如:30',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'management',
      'title': '物业管理费:',
      'placeholder': '如:2.9',
      'type': 'text',
      'maxlength': 50
    },
    
    {
      'id': 'price',
      'title': '价格:',
      'placeholder': '如:11000',
      'type': 'text',
      'maxlength': 50
    },
    {
      'id': 'vr',
      'title': 'VR链接:',
      'placeholder': '',
      'type': 'text',
      'maxlength': 50
    },



    ],




    // 房型选择结果
    localSelected: [0,0],
    // 委托类型
    EntrustType: '',
    // 表单数据
    FormData: {
      
      //房间面积大小
      'area': '',
     
     
      // 车位总数
      'car': '',
      // 开发商
     
      // 物业公司
     
      //最高楼层
      'floor': '',
      //产权年限
      'year': '',
      
      //绿化率
      'greenRate': '',
      //物业管理费
      'management': '',
      //房子类型
      'type': '',
      //价格
      'price': '',
      'vr': '',
      // 房子标签
      'Tags': [],
      // 房子类型，新房，旧房
      'type':'',
      'elevator':'',
      'decoration':'',
      'local':'',



    },
    // 地图列表
    imgList1: [],
    // 封面和轮播列表
    imgList2: [],
    // 户型列表
    imgList3: [],
    modalName: null,
    // 标签选择
    checkbox: [{
      value: 0,
      name: '优惠打折',
      checked: false
    }, {
      value: 1,
      name: '近地铁',
      checked: false
    }, {
      value: 2,
      name: '低总价',
      checked: false
    }, {
      value: 3,
      name: '交通便利',
      checked: false
    }, {
      value: 4,
      name: '近商圈',
      checked: false
    }, {
      value: 5,
      name: '精装',
      checked: false
    }, {
      value: 6,
      name: '毛坯房',
      checked: false
    }, {
      value: 7,
      name: '配套齐全',
      checked: false
    }, {
      value: 8,
      name: '小户型',
      checked: false
    }, {
      value: 9,
      name: '环境优美',
      checked: false
    }, {
      value: 10,
      name: '学区房',
      checked: false
    }, {
      value: 11,
      name: '靠山傍海',
      checked: false
    }],
    // 标签的显示
    displayTags: '',
    // 临时变量
    templeCheckbox: [],
    templeTags: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    wx.showLoading({
      
    })
    this.getAdress()



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



  // 选择封面和轮播照片
  ChooseImage2() {
    wx.chooseImage({
      count: 3, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList2.length != 0) {
          this.setData({
            imgList2: this.data.imgList2.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList2: res.tempFilePaths
          })
        }
      }
    });
  },

  // 预览封面和轮播照片
  ViewImage2(e) {
    wx.previewImage({
      urls: this.data.imgList2,
      current: e.currentTarget.dataset.url
    });
  },

  // 删除封面和轮播照片
  DelImg2(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList2.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList2: this.data.imgList2
          })
        }
      }
    })
  },


  //户型照片
  ChooseImage3() {
    wx.chooseImage({
      count: 6, //默认9
      sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList3.length != 0) {
          this.setData({
            imgList3: this.data.imgList3.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList3: res.tempFilePaths
          })
        }
      }
    });
  },

  // 预览户型照片
  ViewImage3(e) {
    wx.previewImage({
      urls: this.data.imgList3,
      current: e.currentTarget.dataset.url
    });
  },

  // 删除户型照片
  DelImg3(e) {
    wx.showModal({
      title: '提示',
      content: '确定要删除这张照片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList3.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList3: this.data.imgList3
          })
        }
      }
    })
  },

  // 显示弹窗
  showModal(e) {
    console.log('0.showModal')
    let templeCheckbox = this.data.checkbox
    this.setData({
      templeCheckbox: templeCheckbox,
      modalName: e.currentTarget.dataset.target
    })
  },

  

  // 点击确认后保存显示confirm
  Confirm(e) {
    console.log('2.Confirm')
    let templeTags = this.data.templeTags
    let templeCheckbox = this.data.templeCheckbox
    let FormData = this.data.FormData
    FormData.Tags = templeTags
    this.setData({
      FormData: FormData,
      checkbox: templeCheckbox,
      displayTags: templeTags.join(','),
      modalName: null
    })
  },

  // 选择弹窗
  ChooseCheckbox(e) {
    console.log('3.ChooseCheckbox')
    let strArray = []
    let templeTags = this.data.templeTags
    let templeCheckbox = this.data.templeCheckbox

    console.log('templeCheckbox', templeCheckbox[0].checked)

    let values = e.currentTarget.dataset.value
    let name = e.currentTarget.dataset.name

    console.log('values', values, 'name', name, templeTags.includes(name))

    // 只能选4个标签
    if (templeTags.length < 3) {
      // 修改checkbox的显示
      for (let i = 0; i < templeCheckbox.length; i++) {
        if (templeCheckbox[i].value == values) {
          templeCheckbox[i].checked = !templeCheckbox[i].checked;
          break;
        }
      }
    } else if (templeTags.length >= 3) {
      // 超过四个标签后，只能取消，不能继续选
      if (templeTags.includes(name)) {
        // 修改checkbox的显示
        for (let i = 0; i < templeCheckbox.length; i++) {
          if (templeCheckbox[i].value == values) {
            templeCheckbox[i].checked = !templeCheckbox[i].checked;
            break;
          }
        }
      } else {
        wx.showToast({
          title: '最多只能选3个',
          icon: 'none'
        })
      }
    }

    // 实时显示
    for (let i = 0; i < templeCheckbox.length; i++) {
      if (templeCheckbox[i].checked) {
        strArray.push(templeCheckbox[i].name)
      }
    }

    console.log(strArray, templeCheckbox)

    // 存在临时的变量，点击确认后再保存显示
    this.setData({
      templeTags: strArray,
      templeCheckbox: templeCheckbox
    })

  },

  // Tab切换
  ChangeTab(e) {
    wx.showToast({
      title: `切换为 ${e.detail.name}`,
      icon: 'none'
    });
  },



  

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
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
    let p2 = new Promise((resolve2, reject) => {
      this.upload2(resolve2)
    })
    let p3 = new Promise((resolve3, reject) => {
      this.upload3(resolve3)
    })
    let p4 = new Promise((resolve4, reject) => {
      this.uploadTxT(resolve4)
    })
    Promise.all([p1, p2, p3, p4]).then(res => {
      console.log("res", res)
      console.log("数据全部上传完毕，执行数据库操作")
      let FormData = this.data.FormData
      db.collection('VRList').add({
        data: {
          address: this.data.address,
          name: this.data.community,
          local: FormData.local,
          type: FormData.type,
          elevator: FormData.elevator,
          decoration: FormData.decoration,
          car: FormData.car,
          area: FormData.area,
          brief: FormData.brief,
          orientation: FormData.orientation,
          floor: FormData.floor,
          houseYear: FormData.year,
          greenRate: FormData.greenRate,
          management: FormData.management,
          price: parseInt(FormData.price),
          houseUrls: this.data.fileIds3,
          management: FormData.management,
          mapUrl: this.data.fileIds1[0],
          tags: FormData.Tags,
          txtUrl: this.data.txtUrl,
          picUrls: this.data.fileIds2,
          volumeRate: FormData.volumeRate,
          vrUrl: FormData.vr,

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
    let path = 'lc-fdc/house' + '/txt/'
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
        let path = 'lc-fdc/house' + '/map/'
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

  upload2(resolve2) {
    // 上传封面图片
    console.log("up2", this.data.imgList2)
    let promiseArr = []
    for (let i = 0; i < this.data.imgList2.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgList2[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
        let path = 'lc-fdc/house' + '/cover/'
        wx.cloud.uploadFile({
          cloudPath: path + new Date().getTime() + Math.random(1000, 9999) + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds2: this.data.fileIds2.concat(res.fileID)
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
      console.log("封面图片上传完毕")
      resolve2("封面ok")
    })

  },




  upload3(resolve3) {
    console.log("up3", this.data.imgList3)
    // 上传户型图片
    let promiseArr = []
    for (let i = 0; i < this.data.imgList3.length; i++) {
      promiseArr.push(new Promise((reslove, reject) => {
        let item = this.data.imgList3[i];
        let suffix = /\.\w+$/.exec(item)[0]; //正则表达式，返回文件扩展名
        let path = 'lc-fdc/house' + '/house/'
        wx.cloud.uploadFile({
          cloudPath: path + new Date().getTime() + Math.random(1000, 9999) + suffix, // 上传至云端的路径
          filePath: item, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log(res.fileID)
            this.setData({
              fileIds3: this.data.fileIds3.concat(res.fileID)
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
      console.log("户型图片上传完毕，执行数据库操作")
      resolve3("户型图ok")
    })


  },



  // 区域选择
  localStyleChange(e) {
    let localList = this.data.localList
    let FormData = this.data.FormData
    console.log(e, e.detail.value)
    let value = e.detail.value
    let shi = value[0]
    let qu = value[1]
   

    

    
      shi = localList[0][shi]
    
    
      qu = localList[1][qu]
    
    

    let local = `${shi}${qu}`

    

    

    
    FormData.local = local

    this.setData({
      localSelected: value,
      FormData
    })
  },

  getAdress(){
    wx.cloud.callFunction({
      name:'getAdress',
      data:{
        type:'adress'
      },
    }).then(res =>{
      console.log(res)
      var newObject = [];
      for (var i = 0; i < res.result.data.length; i++) {
        
        newObject.push(res.result.data[i].address)
      }
      this.setData({
        addressList: newObject
      })
      this.getCommunity()
    })



     
  },

  getCommunity(){
    wx.cloud.callFunction({
      name: 'getAdress',
      data: {
        type: 'community'
      },
    }).then(res => {
      console.log(res)
      var newObject = []
       for (var i = 0; i < res.result.data.length; i++) {
        
         newObject.push(res.result.data[i].name)
      }
      this.setData({
        communityList: newObject
      })
      wx.hideLoading();
      
    })
  },
  bindAdressChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      address: this.data.addressList[e.detail.value]
    })
  },
  bindCommunityChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      community: this.data.communityList[e.detail.value]
    })
  },
  




})