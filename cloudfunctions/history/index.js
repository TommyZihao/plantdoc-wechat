// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const historyList = (await cloud.database().collection('predictions').where({openid,}).get()).data
  if (historyList.length == 0) {
      return false
  } else {
      const res = historyList.map(item => {
          return {
              _id: item._id,
              imageUrl: item.imageUrl,
              time: item.time,
              mostProbably: item.predictions[0].tagName
          }
      })
      return res
  }
}