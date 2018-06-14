var app = getApp()
Page( {
  data: {
    userInfo: {},
  
  },

  onLoad: function() {
  },
  previewImage: function(){
    wx.previewImage({
      current: 'https://wxmms.swissems.cn/images/viewfile.jpg',
      urls: ['https://wxmms.swissems.cn/images/viewfile.jpg'],
      success: (res)=> {},
      fail: (res) => { console.log(res)},
      complete: (res) => { },
    })
  }
})