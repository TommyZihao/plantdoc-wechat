<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">示例图片</block>
        </cu-custom>
        <view class="flex flex-wrap full-screen-width padding-sm justify-around">
            <view class="sample shadow-blur bg-white flex flex-direction align-center radius margin-bottom" v-for="(item, index) in sampleList"
                :key="index" @click="prediction(item.url)">
                <image :src="item.url" mode="scaleToFill"></image>
                <view class="padding-sm">
                    {{item.name}}
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                sampleList: []
            };
        },
        async onLoad() {
            const res = await wx.cloud.callFunction({
                name: 'sampleList'
            })
            this.sampleList = res.result
        },
        methods: {
            async prediction(url) {
                uni.showLoading({
                    mask:true,
                    title:'正在加载'
                })
                uni.hideLoading()
                uni.navigateTo({
                    url: `/pages/home/result?uploadRes=${url}`,
                })
            }
        },
        onShareAppMessage() {
            return {
                title: '示例图片',
                path: '/pages/sample/sample'
            }
        }
    }
</script>

<style lang="scss">
.sample {
    width: 45vw;
    height: 55vw;
    overflow: hidden;
    image {
        width: 45vw;
        height: 45vw;
    }
    view {
        text-align: center;
    }
}
</style>
