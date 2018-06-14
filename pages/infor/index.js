import h from '../../utils/url.js'
var app = getApp()
Page( {
  data: {
    reportInfo:'',
    loadingHidden:false,
  },

  onLoad: function(options) {
   
  },
  onShow:function(){
    wx.getStorage({
      key: 'orderInfo',
      success: (res)=> {
        console.log(res)
        //请求服务器
        wx.request({
          url: h.main + "/emsxm/page/listByquery2.html",
          data: {
            FText14: res.data.FText14,
            FText: res.data.FText  //机器
          },
          method: 'post', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          header: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
          }, // 设置请求的 header
          success: (res) => {
            // success
            console.log('查询报表结果backInfo------');
            console.log(res)
            var temp = res.data
            var tempArray = []
            var len = temp.list.length/2
            for (var i = 0; i < len; i++) {
              var obj = {}
              var spliceInfo = temp.list.splice(0, 2)
              obj.Ref = spliceInfo[0]
              obj.dev = spliceInfo[1]
              tempArray.push(obj)
            }
            temp.list = tempArray
            this.setData({
              reportInfo: temp,
              loadingHidden: true
            })

          },
          fail: (res) => {
          },
          complete: (res) => {
          }
        })
      },
    })


  },
  

})