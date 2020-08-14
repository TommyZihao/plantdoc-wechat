<template>
	<view>
		<cu-custom bgColor="bg-gradual-green" :isBack="true">
		    <block slot="backText">返回</block>
		    <block slot="content">诊断历史</block>
		</cu-custom>
        <view class="flex flex-wrap full-screen-width padding justify-around">
            <view class="sample shadow-blur bg-white flex flex-direction align-center radius margin-bottom" v-for="(item, index) in history"
                :key="index" @click="prediction(item._id)">
                <image :src="item.imageUrl" mode="scaleToFill"></image>
                <view class="padding-sm full-width">
                    {{item.mostProbably}}
                </view>
                <view class="padding-bottom-sm padding-left-sm full-width">
                    {{$formatTime(item.time)}}
                </view>
            </view>
        </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				history: []
			};
		},
        async onLoad() {
            const res = await wx.cloud.callFunction({
                name: 'history'
            })
            console.log(res.result)
            this.history = res.result
        },
        methods: {
            async prediction(_id) {
                uni.navigateTo({
                    url: `/pages/home/result?_id=${_id}`,
                })
            }
        },
	}
</script>

<style lang="scss">
.sample {
    width: 90vw;
    height: 100vw;
    overflow: hidden;
    image {
        width: 90vw;
        height: 90vw;
    }
    view {
        text-align: left;
    }
}
</style>
