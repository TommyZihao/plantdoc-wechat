import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom', cuCustom)

wx.cloud.init({
    traceUser: true,
    env: 'agricultural-pest-re9w0'
});

Vue.prototype.$db = wx.cloud.database({env: 'agricultural-pest-re9w0'})
Vue.prototype.$downloadPic = async (url) => {
    const [error, photo] = await uni.downloadFile({
        url,
    })
    console.log('photo download res:', photo)
    return photo.tempFilePath
}
Vue.prototype.$uploadPic = async (photo) => {
    uni.showLoading({
        mask:true,
        title:'正在上传'
    })
    const [err, picInfo] = await uni.getImageInfo({
        src: photo
    })
    console.log(picInfo)
    let cloudPath = picInfo.path.split('/')
    cloudPath = cloudPath[cloudPath.length - 1]
    const res = await wx.cloud.uploadFile({
        cloudPath,
        filePath: photo
    })
    uni.hideLoading()
    return res.fileID
}
Vue.prototype.$formatTime = (time) => {
    let date = new Date(time)
    if (!time) {
        date = new Date()
    }
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()
    const seconds = date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds()
    return `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
