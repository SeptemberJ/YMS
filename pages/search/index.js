import h from '../../utils/url.js'
var app = getApp()
Page( {
  data: {
    searchShow:true,
    hasResult:4,
    orderNo1:'',
    orderNo2:'',
    orderNo3:'',
    orderNo4:'',
    machineNo1:'',
    machineNo2:'',
    machineNo3:'',
    machineNo4:'',
    orderNofocus1:false,
    orderNofocus2:false,
    orderNofocus3:false,
    orderNofocus4:false,
    machineNofocus1:false,
    machineNofocus2:false,
    machineNofocus3:false,
    machineNofocus4:false,
    attention: app.globalData.attention,
    //orderInfor:{},
    loadingHidden:true,
  },

  onLoad: function(options) {
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      this.setData({
        userInfo: userInfo,
        nickName: userInfo.nickName,
      })
      console.log(this.data.userInfo)
    })
    
    
   
   
  },
  onShow:function(){
    console.log('show----')


  },
  //订单编号
  changeOrderNo1: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          orderNo1: inputVal,
          orderNofocus2:true
      })
  },
  changeOrderNo2: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          orderNo2: inputVal,
          orderNofocus3:true
      })
  },
  changeOrderNo3: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          orderNo3: inputVal,
          orderNofocus4:true
      })
  },
  changeOrderNo4: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          orderNo4: inputVal,
          orderNofocus4:false
      })
  },
//机器编号
  changeMachineNo1: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          machineNo1: inputVal,
          machineNofocus2:true
      })
  },
  changeMachineNo2: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          machineNo2: inputVal,
          machineNofocus3:true
      })
  },
  changeMachineNo3: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          machineNo3: inputVal,
          machineNofocus4:true
      })
  },
  changeMachineNo4: function(e){
    var inputVal = e.detail.value.trim()
    var len = inputVal.length
      this.setData({
          machineNo4: inputVal,
          machineNofocus4:false
      })
  },
// 清除输入
  clearOrderNo: function(e){
      this.setData({
          orderNo1: '',
          orderNo2: '',
          orderNo3: '',
          orderNo4: '',
          orderNofocus1:true,
          orderNofocus2:false,
          orderNofocus3:false,
          orderNofocus4:false,
          machineNofocus1:false,
          machineNofocus2:false,
          machineNofocus3:false,
          machineNofocus4:false,
      })
  },
  clearMachineNo: function(e){
      this.setData({
          machineNo1: '',
          machineNo2: '',
          machineNo3: '',
          machineNo4: '',
          orderNofocus1:false,
          orderNofocus2:false,
          orderNofocus3:false,
          orderNofocus4:false,
          machineNofocus1:true,
          machineNofocus2:false,
          machineNofocus3:false,
          machineNofocus4:false,
      })
  },

// 搜索
  toSearch: function(){
      var orderNo = this.data.orderNo1+this.data.orderNo2+this.data.orderNo3+this.data.orderNo4
      var machineNo = this.data.machineNo1+this.data.machineNo2+this.data.machineNo3+this.data.machineNo4
      if(orderNo.length<4){    
            wx.showModal({    
                    title:'提示',    
                    content: '快递单号格式不对!',    
                    confirmColor:'#1296db',    
                    showCancel: false,    
                    success: (res)=>{    
                        if (res.confirm) {
                            this.setData({
                                orderNo: '',
                                machineNo: ''
                            })      
                        }    
                    }    
                });    
                return false;    
            }
      console.log(orderNo)
      console.log(machineNo)
      this.setData({
        loadingHidden:false
      })
      //请求服务器
          wx.request({
            url:  h.main+"/emsxm/page/listByquery1.html",
            data: {
             FText14:orderNo,
             FText:machineNo
            },
            method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
               'content-type': 'application/x-www-form-urlencoded' ,
                'Accept': 'application/json'
            }, // 设置请求的 header
            success: (res)=>{
              // success
              console.log('查询结果backInfo------');
              console.log(res.data);
              this.setData({
                loadingHidden:true
              })
              //更改全局注意数据,改为固定文字提示
              //0--无 1--正常 2--重复 3--超过3个月  4--页面初始
              switch(res.data[5])
                {
                case 0:
                  this.setData({
                    hasResult:0,
                    orderInfor: res.data,
                    attention: app.globalData.attention
                  })
                  break;
                case 1:
                  this.setData({
                    hasResult:1,
                    orderInfor:res.data,
                    attention: res.data[8]
                  })
                  break;
                case 2:  
                  this.setData({
                    hasResult:2,
                    orderInfor: res.data,
                    attention: app.globalData.attention
                  })
                  break;
                case 3:
                  this.setData({
                    hasResult: 3,
                    orderInfor: res.data,
                    attention: app.globalData.attention
                  })
                  break;
                default:
                  this.setData({
                    hasResult:4,
                    orderInfor: res.data,
                    attention: app.globalData.attention
                  })
                } 
                // storage
                wx.setStorage({
                  key: 'orderInfo',
                  data: { 'FText14': orderNo, 'FText': machineNo},
                })

            },
            fail: (res)=>{
            },
            complete: (res)=>{
            }
          })
  },
  goReport: function(){
    wx.navigateTo({
      url: '../infor/index',
    })
  }

})