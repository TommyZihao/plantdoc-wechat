<template>
    <view class="flex flex-direction">
        <view>
            <camera v-if="photo.length === 0" @error="error"></camera>
            <image v-else :src="photo"></image>
        </view>
        <view class="action-area flex align-center justify-around">
            <view class="flex justify-around align-center" v-if="photo.length === 0">
                <view class="photo-action-wrap round shadow-blur" @click="takePhoto">
                    <view class="photo-action bg-gradual-green round">
                    </view>
                </view>
            </view>
            <view v-else class="full-width flex justify-around align-center">
                <view @click="clearPhoto" class="finish-action bg-red round flex justify-around align-center shadow-blur text-xxl">
                    <text class="cuIcon-close"></text>
                </view>
                <view @click="confirmPhoto" class="finish-action bg-green round flex justify-around align-center shadow-blur text-xxl">
                    <text class="cuIcon-check"></text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                photo: ''
            };
        },
        methods: {
            takePhoto() {
                const ctx = uni.createCameraContext()
                const res = ctx.takePhoto({
                    success: (res) => {
                        console.log(res.tempImagePath)
                        this.photo = res.tempImagePath
                    }
                })

            },
            clearPhoto() {
                this.photo = ''
            },
            async confirmPhoto() {
                const uploadRes = await this.$uploadPic(this.photo)
                console.log(uploadRes)
                uni.navigateTo({
                    url: `result?uploadRes=${uploadRes}`,
                })
            },
            error(e) {
                console.log(e.detail)
            },
        },
        onHide() {
            this.photo = ''
        },
        onShareAppMessage() {
            return {
                title: '识农害',
                path: '/pages/home/home'
            }
        }
    }
</script>

<style lang="scss">
    camera,
    image {
        width: 100vw;
        height: 85vh;
    }

    .action-area {
        height: 15vh;
    }

    .photo-action-wrap {
        padding: 1.5vh;
        background: rgba($cu-color-green, 0.2);
        .photo-action {
            width: 8vh;
            height: 8vh;
        }
    }
    .finish-action {
        width: 8vh;
        height: 8vh;
    }
</style>
