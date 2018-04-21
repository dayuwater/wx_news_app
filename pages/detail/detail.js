// 常数 (向安卓致敬)
import * as R from '../../utils/constants.js'
import * as U from '../../utils/util.js'

// pages/detail/detail.js
Page({
  // 目录（使用 Ctrl + F 以快速定位)：
  // 数据绑定
  // 生命周期
  // 按钮事件函数
  // API

  /**
   * 数据绑定
   * 页面的初始数据
   */
  data: {
    status: R.PAGE_INIT
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      newsId: id
    })

    this.getDetail(id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  // API
  // 获取某个具体新闻的详细内容
  // 并把结果存入data
  getDetail(id) {
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        "id": id
      },
      success: res => {
        // 由于wx.request不负责检查服务器返回代码， 需要对错误代码单独处理
        if (res.data.code < 400) {
          const result = res.data.result
          const {content,date,readCount,source,title} = result

          // 这个content最好还是交给WXML用条件渲染来处理
          // 但是，所有在image后面出现的p都是那个图片的描述
          // 必须特殊处理， 以便显示在图片下方

          // 挑出所有image的id
          const imageIds = content.filter(c => c.type === "image").map(c => c.id)
          
          // 给所有图片后的文字加一个flag
          const processedContent = content.map((c, idx) => ({
            ...c,
            afterImg: imageIds.includes(idx)
          }))
          
          // 设置标题
          this.setData({
            time: U.formatTime(new Date(date)),
            readCount: readCount,
            source: source,
            title: title,
            content: processedContent,
            status: R.PAGE_SUCCESS

          })

          


        }
        // 一般情况下，如果返回代码在400以上，基本上是错误请求
        else{
          wx.showToast({
            title: R.networkErrorText,
          })
          this.setData({
            status: R.PAGE_NETWORK_ERROR
          })
        }

      },
      fail: () => {
        wx.showToast({
          title: R.networkErrorText,
        })
        this.setData({
          status: R.PAGE_NETWORK_ERROR
        })
      }

    })
  }



})