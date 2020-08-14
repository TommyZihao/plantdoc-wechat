<template>
    <view>
        <!-- 头像 -->
        <view class="avatar-area bg-gradual-green flex flex-direction justify-around align-center">
            <open-data type="userAvatarUrl"></open-data>
            <open-data class="content text-white text-xl" type="userNickName"></open-data>
        </view>

        <!-- 宫格菜单 -->
        <view class="cu-list grid col-3 no-border">
            <view class="cu-item" v-for="(item,index) in gridList" :key="index" v-if="index<3*2" @click="menuClick(item.name, item.page)">
                <view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
                    <view class="cu-tag badge" v-if="item.badge!=0">
                        <block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
                    </view>
                </view>
                <text>{{item.name}}</text>
            </view>
        </view>

        <!-- 列表菜单 -->
        <view class="cu-list menu margin-top">
            <view class="cu-item arrow" v-for="(item,index) in menuList" :key="index" @click="menuClick(item.name, item.page)">
                <view class="content">
                    <text :class="['cuIcon-' + item.cuIcon,'text-' + item.color]"></text>
                    <text class="text-grey">{{item.name}}</text>
                </view>
            </view>
        </view>

        <!-- 版权信息 -->
        <view class="content text-sm text-gray text-center padding">
            &copy; 智能识农害
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                gridList: [{
                    cuIcon: 'favor',
                    color: 'orange',
                    badge: 0,
                    page: 'history',
                    name: '诊断历史'
                }, {
                    cuIcon: 'likefill',
                    color: 'red',
                    badge: 0,
                    page: '',
                    name: '我的收藏'
                }, {
                    cuIcon: 'comment',
                    color: 'yellow',
                    badge: 0,
                    page: '',
                    name: '我的问答'
                }],
                menuList: [{
                    cuIcon: 'album',
                    color: 'olive',
                    badge: 0,
                    page: 'sample',
                    name: '示例图片'
                }, {
                    cuIcon: 'picfill',
                    color: 'cyan',
                    badge: 0,
                    page: '',
                    name: '相册上传'
                }, {
                    cuIcon: 'infofill',
                    color: 'green',
                    badge: 0,
                    page: 'about',
                    name: '关于我们'
                }, {
                    cuIcon: 'formfill',
                    color: 'blue',
                    badge: 0,
                    page: '',
                    name: '意见反馈'
                }]
            };
        },
        methods: {
            async upload() {
                const [err, res] = await uni.chooseImage({
                    count: 1,
                    sourceType: ['album'],
                    sizeType: ['compressed']
                })
                console.log('choose image res: ', res.tempFilePaths[0])
                const uploadRes = await this.$uploadPic(res.tempFilePaths[0])
                console.log(uploadRes)
                uni.navigateTo({
                    url: `/pages/home/result?uploadRes=${uploadRes}`,
                })
            },
            async menuClick(name, page) {
                if (name == '相册上传') {
                    await this.upload()
                } else if (name == '意见反馈') {
                    const [err, clientInfo] = await uni.getSystemInfo()
                    console.log(clientInfo)
                    uni.navigateToMiniProgram({
                        appId: 'wx8abaf00ee8c3202e',
                        extraData: {
                            id: '143723',
                            customData: {
                                os: clientInfo.platform,
                                osVersion: clientInfo.system,
                                clientVersion: clientInfo.version
                            }
                        }
                    })
                } else if (page.length == 0) {
                    uni.showToast({
                        mask: true,
                        icon: 'none',
                        title: '功能开发中'
                    })
                } else {
                    uni.navigateTo({
                        url: page
                    })
                }
            }
        },
    }
</script>

<style lang="scss">
    .avatar-area {
        width: 100vw;
        height: 60vw;
        box-sizing: border-box;
        padding-top: 20vw;
        padding-bottom: 5vw;

        open-data[type="userAvatarUrl"] {
            width: 128rpx;
            height: 128rpx;
            border-radius: 50%;
            overflow: hidden;
        }
    }
</style>
