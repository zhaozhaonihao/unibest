<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '详情',
  },
}
</route>

<script lang="ts" setup>
const { articleID, ArticleDetail } = storeToRefs(useOtherStore())
const { RunGetArticleDetail } = useOtherStore()

onLoad(() => {
  if (articleID.value)
    RunGetArticleDetail()
})
onUnload(() => {
  articleID.value = undefined
  ArticleDetail.value = undefined
})

// 计算属性：格式化文章详情
const articleDetail = computed(() => {
  const cont = ArticleDetail.value?.apiArticleDto
  return {
    title: cont?.title,
    time: cont?.createdDateStr,
    image: cont?.faceImage,
    content: cont?.contentText,
  }
})
</script>

<template>
  <view class="flex-1 p-4 flex flex-col gap-4 bg-white">
    <!-- 标题 -->
    <view class="text-lg text-gray-800 font-bold">
      {{ articleDetail.title }}
    </view>

    <!-- 时间 -->
    <view class="text-sm text-gray-500">
      {{ articleDetail.time }}
    </view>

    <!-- 内容区 -->
    <view class="flex-1 overflow-y-auto flex flex-col gap-4">
      <!-- 文章图片（可选） -->
      <image
        v-if="articleDetail.image"
        :src="articleDetail.image"
        mode="widthFix"
        class="w-full rounded-lg"
      />

      <!-- 文章正文（富文本） -->
      <rich-text class="text-gray-700 leading-relaxed" :nodes="articleDetail.content" />
    </view>
  </view>
</template>
