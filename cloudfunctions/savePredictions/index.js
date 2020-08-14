// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openid = cloud.getWXContext().OPENID
  const predictionsCol = cloud.database().collection('predictions')
  
  const data = {
    openid,
    imageUrl: event.imageUrl,
    time: new Date(event.time),
    predictions: event.predictions
  }
  const addRes = await predictionsCol.add({
    data,
  })
  return {addRes, data, event}
}