<template>
    <view>
        <cu-custom bgColor="bg-gradual-green" :isBack="true">
            <block slot="backText">返回</block>
            <block slot="content">关于我们</block>
        </cu-custom>
        <jyf-parser :html="html" class="padding-left-xl padding-right-xl padding-top padding-bottom" @linkpress="copyLink" />
    </view>
</template>

<script>
    export default {
        data() {
            return {
                html: ''
            };
        },
        async onLoad() {
            uni.showLoading({
                mask: true,
                title: '正在加载'
            })
            const res = (await this.$db.collection('pages').doc('about').get()).data
            console.log(res)
            this.html = res.html
            uni.hideLoading()
        },
        methods: {
            copyLink(e) {
                uni.setClipboardData({
                    data: e.href
                })
                uni.showToast({
                    title: '链接已复制',
                    mask: true
                })
            }
        },
        onShareAppMessage() {
            return {
                title: '关于我们',
                path: '/pages/about/about'
            }
        }
    }
</script>

<style lang="scss">
    page {
        background-color: $cu-color-white;
    }
</style>
