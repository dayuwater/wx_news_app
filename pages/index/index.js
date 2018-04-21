// 常数 (向安卓致敬)
import * as R from '../../utils/constants.js'
import * as U from '../../utils/util.js'

//index.js
//获取应用实例
const app = getApp()

const categories = {"国内":"gn", "国际":"gj", 
"财经":"cj", "娱乐":"yl", "军事":"js", 
"体育":"ty", "其他":"other"}

Page({
  // 目录（使用 Ctrl + F 以快速定位)：
  // 数据绑定
  // 按钮事件函数
  // 生命周期
  // API

  // 数据绑定
  data:{
    categories: Object.keys(categories),
    currentCategory: "国内",
    status: R.PAGE_INIT
  },

  // 按钮事件函数

  /* 当用户点击新闻类别时
   * 该函数触发
   */
  onCategoryTap(event){
    // 获取当前新闻类别
    const category = event.currentTarget.dataset.category
    this.setData({
      status: R.PAGE_INIT
    })

    // 获取新闻， 刷新页面， 重设当前类别
    this.fetchNews(category, () => {
      this.setData({
        currentCategory: category
      })
    })
  },

  /* 当用户点击某条新闻时
   * 该函数触发，跳转至详情页面
   */
  onNewsTap(event){
    // 获取新闻ID
    const id = event.currentTarget.dataset.newsid

    // 跳转到详细页面
    wx.navigateTo({
      url: `../../pages/detail/detail?id=${id}`,
      
    })


  },

  // 生命周期
  onLoad(){
    this.fetchNews(this.data.currentCategory)
  },

  onPullDownRefresh(){
    this.fetchNews(this.data.currentCategory, () => {
      wx.stopPullDownRefresh()
    })

  },

  // API

  // 获取某类型的新闻列表 （category 为中文）
  fetchNews(category, callback){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        "type": categories[category]
      },
      success: res => {
        // 由于wx.request不负责检查服务器返回代码， 需要对错误代码单独处理
        if(res.data.code < 400){
          // 抽出API返回结果
          const results = res.data.result
          console.log(results)

          // 如果有新闻
          if(results.length > 0){

            // 转化为需要显示的结果
            const parsed = results.map((result, idx) => ({
              id: result.id,
              title: idx == 0 ? result.title : U.padText(result.title),
              source: result.source,
              time: U.formatTime(new Date(result.date)),
              image: result.firstImage
            }))

            console.log(parsed)

            this.setData({
              firstNews: parsed[0],
              otherNews: parsed.slice(1),
              status: R.PAGE_SUCCESS

            })

          }

          // 如果没有新闻,返回没新闻的界面
          else{
            this.setData({
              status: R.PAGE_NO_NEWS
            })
          }

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
      },
      complete: () => {
        // 后续处理函数
        callback && callback()
      }

    })
  }

  
  

})