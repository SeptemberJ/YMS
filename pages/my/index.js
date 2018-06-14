var app = getApp()
Page( {
  data: {
    userInfo: {},
  
  },

  onLoad: function() {
    this.setData({
      userInfo: app.globalData.userInfo
    })
    
   
  },
  toOperationIntro:function(){
    wx.navigateTo({
      url: '../operationIntro/index'
		});
  },
  makeCall: function (e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.fmobile
    })
  }
  
  
})