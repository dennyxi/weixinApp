const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}

const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowTemp:"12",
    nowWeather:"sun",
    nowWeatherBackground:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(){
    this.getNew()
  },
  
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getNew(() =>{
      wx.stopPullDownRefresh()
    })
  },
  getNew (callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      data: {
        city:'广州市'

        },
        success: res =>{
          let result = res.data.result
          let temp = result.now.temp
          let weather = result.now.weather
          console.log(temp, weather)
          this.setData({
            nowTemp:temp + "°",
            nowWeather: weatherMap[weather],
            nowWeatherBackground:'/images/' + weather + '-bg.png'

          })
          wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: weatherColorMap[weather]
  
          })
        },
        complete:()=>{
          callback && callback()
        }
      })
    }
})