<template>
  <view class="flex items-center gap-3 p-3 h-25 bg-white rounded-2">
    <wd-img :src="article.faceImage" :width="80" :height="80" class="shrink-0 rounded-2" />

    <view class="flex-1 flex flex-col justify-between h-full overflow-hidden">
      <view class="title text-4 font-bold">{{ article.title }}</view>
      <view class="desc lh-normal text-3 text-[#666]">{{ article.description }}</view>
      <view class="shrink-0 text-3 text-right text-[#999]">{{ article.createdTimeStr }}</view>
    </view>
  </view>
</template>

<script setup lang="ts">
import type { News } from '@/service/static'

const { article } = defineProps<{
  article: News
}>()
</script>

<style scoped lang="scss">
.title {
  overflow: hidden; /* 隐藏溢出内容，防止文字超出容器 */
  text-overflow: ellipsis; /* 超出部分显示省略号（需搭配 `white-space: nowrap` 使用） */
  white-space: nowrap; /* 不换行，超出部分才会触发省略号 */
}
.desc {
  display: -webkit-box; /* 采用 WebKit 盒子模型，支持 `-webkit-line-clamp` 限制行数 */
  max-height: 3em; /* 限制最大高度为 3em（1em = 当前字体大小） */
  overflow: hidden; /* 隐藏超出的文本 */
  text-overflow: ellipsis; /* 超出部分显示省略号（但需 `white-space: nowrap`，因此这里不生效） */
  -webkit-line-clamp: 2; /* 限制最多显示 2 行 */
  -webkit-box-orient: vertical; /* 让 `-webkit-line-clamp` 生效，使文本按行计算溢出 */
}
</style>
