<route lang="json5" type="page">
{
  layout: 'default',
  style: {
    navigationBarTitleText: '上传-状态一体化',
  },
}
</route>

<template>
  <view class="p-4 text-center">
    <wd-button @click="run">选择图片并上传</wd-button>
    <view v-if="loading" class="text-blue h-10">上传...</view>
    <template v-else>
      <view class="m-2">上传后返回的接口数据：</view>
      <view class="m-2">{{ data }}</view>
      <view class="h-80 w-full">
        <image v-if="data" :src="data || data" mode="scaleToFill" />
      </view>
    </template>
  </view>
</template>

<script lang="ts" setup>
const { loading, data, run } = useUpload({
  fileBucketID: '8a2f462a850617e301851e5760810d72',
  sessionID: 'b3e1b5e69ee742d1bd4211d3ae5106a8',
})
</script>

<style lang="scss" scoped>
//
</style>
