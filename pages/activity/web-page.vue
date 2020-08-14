<template>
    <view>
        <web-view :src="src"></web-view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                src: ''
            };
        },
        async onLoad(params) {
            this.src = params.src
        }
    }
</script>

<style lang="scss">

</style>
