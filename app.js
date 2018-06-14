//app.js
import h from '/utils/url.js'
// const AV = require('./utils/av-weapp.js');
const appId = "SgHcsYqoLaFTG0XDMD3Gtm0I-gzGzoHsz";
const appKey = "xdv2nwjUK5waNglFoFXkQcxP";
// AV.init({ 
// 	appId: appId, 
// 	appKey: appKey,
// });

App({
  onLaunch: function () {
    console.log('App Launch')
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
     wx.login({
        success: function (a) {
          var code = a.code;
          console.log(code+"*******************")
        
          wx.getUserInfo({
            success: function (res) {
              var encryptedData = encodeURIComponent(res.encryptedData);
               var iv = res.iv;
              that.globalData.userInfo = res.userInfo
              that.globalData.code = code
              that.globalData.encryptedData = encryptedData
              that.globalData.iv = res.iv
            console.log(that.globalData.userInfo)  
           // Login(code,encryptedData,iv);
              typeof cb == "function" && cb(that.globalData.userInfo)

            }
          })
        }
      })
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null,
    code: "",
    encryptedData: "",
    iv: "",
    oppenid:"",
    attention:'保修期内，三要素完整有效，5个工作日完成。保修期外，5个工作日检修回应。(故障产品，信息表，报修凭证)'
  },

})

//Login-----
function  Login(code,encryptedData,iv){  
          console.log('login function---');
          var app = getApp();
          console.log(app.globalData.userInfo);
          //请求服务器
          wx.request({
            url:  h.main+"/XDCJK/page/userInsertWsc.html",
            data: {
             code:code,
             realname:app.globalData.userInfo.nickName,
             head_img:app.globalData.userInfo.avatarUrl
            },
            
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
               'content-type': 'application/x-www-form-urlencoded' ,
                'Accept': 'application/json'
            }, // 设置请求的 header
            success: function (res) {
              // success
              console.log(res.data);
              app.globalData.oppenid=res.data.oppen_id;
            },
            fail: function (res) {
              // fail
                console.log(res);
            },
            complete: function (res) {
              // complete
                console.log(+res);
            }
          })
  }

