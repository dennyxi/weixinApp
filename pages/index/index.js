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
    nowWeatherBackground:"",
    hourweather:[]
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
          //set hourweather
          console.log(result)
          let nowhour = new Date().getHours()
          let hourweather = []
          let forecast = result.forecast
          for (let i = 0 ;i<24;i+=3){
            hourweather.push({
              time:(i+nowhour)%24,
              icon:'/images/'+forecast[i/3].weather+'-icon.png',
              temp:forecast[i/3].temp
            })
          }
          hourweather[0].time ='now'
          this.setData({
            hourweather:hourweather
          })
          
        },
        complete:()=>{
          callback && callback()
        }
      })
    }
})