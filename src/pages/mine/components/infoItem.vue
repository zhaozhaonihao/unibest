<script setup lang="ts">
const { img, title, richText } = defineProps<{
  img: any
  title: string
  richText: string
}>()
</script>

<template>
  <view class="info">
    <!-- 图片 -->
    <wd-img :width="100" :height="100" :src="img" />
    <!-- 标题 -->
    <view class="title">
      {{ title }}
    </view>
    <!-- 文本 -->
    <rich-text class="desc" :nodes="richText" />
  </view>
</template>
