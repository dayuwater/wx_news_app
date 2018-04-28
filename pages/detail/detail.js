"use strict"

// 常数 (向安卓致敬)
import * as R from '../../utils/constants.js'
import * as U from '../../utils/util.js'

// pages/detail/detail.js
Page({
  // 目录（使用 Ctrl + F 以快速定位)：
  // 数据绑定
  // 生命周期
  // API

  /**
   * 数据绑定
   * 页面的初始数据
   */
  data: {
    status: R.PAGE_INIT,
    errorPage: R.pageStatus
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.id
    this.setData({
      status: R.PAGE_INIT,
      newsId: id
    })

    this.getNews(id)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    const id = this.data.newsId
    this.getNews(id, () => {
      wx.stopPullDownRefresh()
    })
  },

  // API
  // 获取某个具体新闻的详细内容
  // 并把结果存入data
  getNews(id, callback) {
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
          
          // 挑出所有image的id
          const imageIds = content.filter(c => c.type === "image").map(c => c.id)
          
          // 给所有图片后的文字加一个flag
          const processedContent = content.map((c, idx) => ({
            ...c,
            afterImg: imageIds.includes(idx)
          }))

          // 如果页面状态不是初始化，显示成功信息
          if (this.data.status !== R.PAGE_INIT) {
            wx.showToast({
              title: R.successToastMsg,
            })
          }

          // 设置内容
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
          this.onApiFailure()
        }

      },
      fail: () => {
        this.onApiFailure()
      },
      complete: () => {
        callback && callback()
      }
    

    })
  },

  // 当API请求失败时
  onApiFailure() {
    if (this.data.status === R.PAGE_SUCCESS) {
      wx.showToast({
        icon: "none",
        title: R.errorToastMsg,
      })
    }
    else {
      this.setData({
        status: R.PAGE_NETWORK_ERROR
      })
    }
  }



})