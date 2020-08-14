<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="false">
            <block slot="content">动态</block>
        </cu-custom>
        <view class="cu-card article no-card margin-bottom-xs" v-for="(item, index) in article" :key="index" @click="toPage(item.url)">
            <view class="cu-item shadow">
                <view class="title">
                    <view class="text-cut">{{item.title}}</view>
                </view>
                <view class="content">
                    <image :src="item.cover" mode="aspectFill"></image>
                    <view class="desc">
                        <view class="text-grey">{{item.desc}}</view>
                        <view>
                            <view class="text-gray">
                                <text class="cuIcon cuIcon-time margin-right-xs"></text>
                                {{item.time}}
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                article: []
            };
        },
        async onLoad() {
            const res = (await this.$db.collection('news').get()).data
            this.article = res.map(item => {
                return {
                    title: item.title,
                    cover: item.cover,
                    desc: item.desc,
                    time: this.$formatTime(item.time),
                    url: item.url
                }
            })
        },
        methods: {
            toPage(url) {
                uni.navigateTo({
                    url: 'web-page?src=' + url
                })
            }
        },
        onShareAppMessage() {
            return {
                title: '动态',
                path: '/pages/activity/activity'
            }
        }
    }
</script>

<style lang="scss">

</style>
