<route lang="json5" type="page">
  {
    layout: 'default',
    style: {
      navigationBarTitleText: '拍照',
      "mp-weixin": {
        "pageOrientation": "landscape", // 横屏模式
      }
    },
  }
  </route>

<script setup lang="ts">
const src = ref<string>()
const ctx = uni.createCameraContext()

function takePhoto() {
  ctx.takePhoto({
    quality: 'high',
    success: (res) => {
      console.log(res)
      src.value = res.tempImagePath
    },
  })
}
</script>

<template>
  <view class="flex h-full justify-between items-center">
    <template v-if="src">
      <wd-img :src="src" custom-class="flex-1 bg-pink-1 w-full rounded-md" mode="widthFix" />
      <view class="flex flex-col justify-evenly items-center h-full">
        <view class="i-tabler:camera-rotate text-10" @click="src = undefined" />
        <view class="i-line-md:circle-to-confirm-circle-transition text-10" @click="takePhoto" />
      </view>
    </template>

    <template v-else>
      <camera class="flex-1 h-full" mode="normal" device-position="back" flash="auto" output-dimension="max">
        <cover-view class="flex justify-center items-center h-full">
          <cover-image class="h-full" src="/static/img/move/flank_outline.png" />
        </cover-view>
      </camera>
      <view class="i-tabler:camera text-10" @click="takePhoto" />
    </template>
  </view>
</template>

  <style scoped lang="scss">

  </style>
