// 初始模版里有的代码，相当有用

// 本来这个是他给的formatTime， 因为不少东西没用， 我把这个函数改名了
const formatFullTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 因为本程序只需显示小时和分钟， 需要对他给的formatTime进行修改
const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 如果标题字数太少会导致格式混乱，需要加一些“空”字符
const padText = s => s + "\u00a0\u00a0\u00a0\u00a0".repeat(Math.max(12 - s.length, 0))

module.exports = {
  formatTime: formatTime,
  padText: padText
}
