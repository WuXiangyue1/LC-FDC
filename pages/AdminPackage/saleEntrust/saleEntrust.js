// pages/entrust/entrust.js
const {
    formatTime
} = require("../../../utils/util.js")


Page({

    /**
     * 页面的初始数据
     */
    data: {
       

        // 渲染输入框
        InputList: [{
            'id': 'detailLocation',
            'title': '楼盘地址:',
            'placeholder': '如广东省中山市保利碧桂园领秀海',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'location',
            'title': '所属小区:',
            'placeholder': '如:碧桂园 领秀海',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'area',
            'title': '房间面积大小:',
            'placeholder': '如:90-130',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'builtArea',
            'title': '建筑面积(单位:㎡):',
            'placeholder': '请填写楼盘的建筑面积',
            'type': 'text',
            'maxlength': 20
        },
        {
            'id': 'coveredArea',
            'title': '占地面积(单位:㎡):',
            'placeholder': '请填写楼盘的占地面积',
            'type': 'text',
            'maxlength': 20
        },
        {
            'id': 'car',
            'title': '车位总数:',
            'placeholder': '如:917',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'area',
            'title': '开发商:',
            'placeholder': '如:中山市越秀地产开发有限公司',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'propertyCompany',
            'title': '公司:',
            'placeholder': '如:广州市越秀物业管理有限公司',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'floor',
            'title': '最高楼层:',
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
            'id': 'volumeRate',
            'title': '容积率:',
            'placeholder': '如:2.5',
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
            'id': 'type',
            'title': '房子类型:',
            'placeholder': '如:三房一厅、两厅',
            'type': 'text',
            'maxlength': 50
        },
        {
            'id': 'openDate',
            'title': '价格:',
            'placeholder': '如:11000-30000',
            'type': 'text',
            'maxlength': 50
        },
        
        
        
        ],

     

        
        // 房型选择结果
        HouseStyleSelected: [0, 0, 0],
        // 委托类型
        EntrustType: '',
        // 表单数据
        FormData: {
            // 详细地址
            'detailLocation': '',
            // 所在小区
            'location': '',
            //装修配置
            'furniture': '',
            // 房子面积
            'area': '',
            // 总价
            'totalPrice': '',
            // 均价
            'averagePrice': '',
            // 委托人姓名
            'name': '',
            // 委托人电话
            'phonenumber': '',
            // 房子标签
            'Tags': [],
            // 房子类型，新房，旧房
            'HouseType': '',
            // 房间类型，如：一室一厅
            'roomStyle': '',
            // 居室类型，如：一居室
            'houseStyle': '',
            // 看房方式
            'LookUpStyle': '',
            // 契税发票时间是否满两年
            'Invoice': '',
            // 网签是否满三年
            'Signing': ''
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
        console.log('eeeee', e, e.title)
        
        

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

    // 房型选择
    HouseStyleChange(e) {
        let HouseStyleList = this.data.HouseStyleList
        let FormData = this.data.FormData
        console.log(e, e.detail.value)
        let value = e.detail.value
        let room = value[0]
        let hall = value[1]
        let toilet = value[2]

        console.log(room, typeof (room), hall, toilet)

        if (room == 0) {
            room = ''
        } else {
            room = HouseStyleList[0][room]
        }
        if (hall == 0) {
            hall = ''
        } else {
            hall = HouseStyleList[1][hall]
        }
        if (toilet == 0) {
            toilet = ''
        } else {
            toilet = HouseStyleList[2][toilet]
        }

        let houseStyle = `${room}${hall}${toilet}`

        let roomStyle = ''

        switch (e.detail.value[0]) {
            case 1:
                roomStyle = '一居室';
                break;
            case 2:
                roomStyle = '二居室';
                break;
            case 3:
                roomStyle = '三居室';
                break;
            case 4:
                roomStyle = '四居室';
                break;
            case 5:
                roomStyle = '五居室';
                break;
            default:
                roomStyle = '无'
        }

        FormData.roomStyle = roomStyle
        FormData.houseStyle = houseStyle

        this.setData({
            HouseStyleSelected: value,
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

    // 关闭弹窗
    hideModal(e) {
        // console.log('1.hideModal')
        // // let templeCheckbox = this.data.templeCheckbox
        // let Tags = this.data.Tags
        // let checkbox = this.data.checkbox
        // // 数据恢复到选择前的状态
        // this.setData({
        //     templeCheckbox: checkbox,
        //     templeTags: Tags,
        //     modalName: null
        // })
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

    // 提交信息前进行数据校验
    Submit(e) {
        let ImgList1 = this.data.imgList1
        let ImgList2 = this.data.imgList2
        let ImgList3 = this.data.imgList3

        let FormData = this.data.FormData
       
       
        // 表单数据的校验
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

        this.setData({
            FormData: FormData
        })

        // 上传图片
        this.UploadImages()
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

    // 提交信息
    SubmitEntrust(photoInfo) {
        wx.showLoading({
            title: '提交委托...',
            mask: true
        })
        let FormData = this.data.FormData
        let EntrustType = this.data.EntrustType
        let that = this
        wx.cloud.callFunction({
            name: 'Entrust',
            data: {
                type: 'add',
                EntrustType: EntrustType,
                FormData: FormData,
                photoInfo: photoInfo,
                updateTime: formatTime(new Date())
            },
            success: res => {
                wx.hideLoading()
                console.log(res)
                wx.showToast({
                    title: '委托提交成功',
                    icon: 'success',
                    duration: 2000
                })
                // 页面跳转到成功页面
                wx.redirectTo({
                    url: '../steps/steps?id=entrust',
                    success: function (res) { },
                    fail: function (res) { },
                    complete: function (res) { },
                })
            },
            fail: err => {
                wx.hideLoading()
                console.log(err)
                wx.showToast({
                    title: '委托提交失败',
                    icon: 'success',
                    duration: 2000
                })
                // 把已经上传的图片删除
                wx.cloud.deleteFile({
                    fileList: photoInfo,
                    success: res => {
                        // handle success
                        console.log('delimages', res.fileList)
                    },
                    fail: console.error
                })
            },
            complete: res => {
                console.log(res)
            }
        })
    },

    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
      },
      chooseMessageFile:function(){
          var that = this
        wx.chooseMessageFile({
            count: 1,
            type: 'file',
            extension:['txt'],
            success (res) {
              // tempFilePath可以作为img标签的src属性显示图片
              const tempFilePaths = res.tempFiles
              console.log(res)
              console.log("tempFilePaths",tempFilePaths)
              that.setData({
                txtName:res.tempFiles[0].name
              })
            }
          })
      },

    

   
    

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})