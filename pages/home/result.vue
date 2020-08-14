<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">诊断结果</block>
        </cu-custom>
        <!-- 拍照结果 -->
        <view class="full-screen-width flex justify-around padding-xl">
            <image :src="uploadRes" class="radius shadow-blur" mode="scaleToFill"></image>
        </view>

        <!-- 识别结果 -->
        <view class="cu-bar bg-white margin-top">
            <view class="action">
                <text class="cuIcon-titles text-green"></text>
                {{predictionRes.length == 0 ? '正在识别……' : '检测到以下可能'}}
            </view>
        </view>
        <view>
            <view class="flex justify-between bg-white padding padding-left-xl padding-right-xl" v-for="(item, index) in predictionRes"
                :key="index">
                <view>{{index+1}}</view>
                <view>{{item.tagName}}</view>
                <view>{{parseInt(item.probability* 100)}}%</view>
            </view>
        </view>

        <!-- 上传数据 -->
        <view v-if="_id.length == 0" class="flex justify-around margin-top-xl">
            <button class="cu-btn round lg bg-gradual-green shadow-blur" @click="saveRes">保存结果</button>
        </view>

    </view>
</template>

<script>
    export default {
        data() {
            return {
                uploadRes: '',
                predictionRes: [],
                _id: ''
            };
        },
        async onLoad(params) {
            if (params.hasOwnProperty('_id')) {
                this.fetchCloudData(params._id)
            } else {
                this.prediction(params)
            }
        },
        methods: {
            async fetchCloudData(_id) {
                uni.showLoading({
                    mask:true,
                    title: '正在加载'
                })
                const res = await this.$db.collection('predictions').doc(_id).get()
                console.log('Cloud Data: ', res)
                this._id = _id
                this.uploadRes = res.data.imageUrl
                this.predictionRes = res.data.predictions
                uni.hideLoading()
            },
            async prediction(params) {
                uni.showLoading({
                    mask: true,
                    title: '正在识别'
                })
                console.log(params)
                this.uploadRes = params.uploadRes
                let imageUrl = this.uploadRes
                if (imageUrl.split(':')[0] == 'cloud') {
                    imageUrl = await wx.cloud.getTempFileURL({
                      fileList: [imageUrl, ],
                    })
                    imageUrl = imageUrl.fileList[0].tempFileURL
                    console.log(imageUrl)
                }
                const [error, res] = await uni.request({
                    url: '<URL>',
                    method: 'POST',
                    data: {
                        'Url': imageUrl
                    },
                    header: {
                        'Prediction-Key': '<ModelArts-Key>'
                    }
                })
                this.predictionRes = res.data.predictions.splice(0, 3)
                console.log(this.predictionRes)
                uni.hideLoading()
            },
            async saveRes() {
                const data = {
                    imageUrl: this.uploadRes,
                    time: new Date(),
                    predictions: JSON.parse(JSON.stringify(this.predictionRes))
                }
                console.log(data)
                uni.showLoading({
                    mask: true,
                    title: '正在保存',
                })
                const res = await wx.cloud.callFunction({
                    name: 'savePredictions',
                    data,
                })
                uni.showToast({
                    mask: true,
                    icon: 'none',
                    title: '保存成功，请在诊断历史中查看！'
                })
                console.log('cloud res: ', res.result)
            }
        },
    }
</script>

<style lang="scss">
    image {
        width: 50vw;
        height: 50vw;
    }
</style>
