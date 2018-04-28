
// 默认图片地址
export const largeImgUrl = "/images/placeholder_cat_large.jpg"
export const smallImgUrl = 
"/images/placeholder_cat_small.jpeg"

// 页面状态
export const PAGE_NOT_FOUND = -2
export const PAGE_INIT = -1
export const PAGE_NO_NEWS = 1
export const PAGE_NETWORK_ERROR = 0
export const PAGE_SUCCESS = 2

// 当异常发生时的页面参数
export const pageStatus = {
  "-1":{
    "icon":"/icons/loading.svg",
    "message": "页面加载中，请稍等",
    "color": "rgba(127, 127, 127, 0.5)"
  },

  "1": {
    "icon": "/icons/no_news.svg",
    "message": "该类别没有新闻",
    "color": "rgba(0, 0, 255, 0.5)"
  },

  "0": {
    "icon": "/icons/error.svg",
    "message": "网络不给力，请在网络环境畅通的地方使用该程序",
    "color": "rgba(255, 0, 0, 0.5)"
  },

  "-2":{
    "icon": "/icons/error.svg",
    "message": "该新闻不存在或者已删除",
    "color": "rgba(255, 0, 0, 0.5)"
  }


}

// 报错用的Toast
export const errorToastMsg = "网络异常, 刷新失败"

// 成功Toast
export const successToastMsg = "刷新成功"