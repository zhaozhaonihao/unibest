<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '文章列表',
  },
}
</route>

<script lang="ts" setup>
import Article from '@/components/Article/index.vue'

const { articleParams, ArticleList, articleList, articleID } = storeToRefs(useArticleStore())
const { RunGetArticleList } = useArticleStore()

onLoad(() => {
  if (articleParams.value)
    RunGetArticleList()
})

onUnload(() => {
  articleParams.value = undefined
  ArticleList.value = undefined
})

function onClick(id: string) {
  articleID.value = id
  uni.navigateTo({ url: '/pages/ArticleDetail' })
}
</script>

<template>
  <view class="flex-1 p-4 flex flex-col gap-4">
    <wd-status-tip v-if="articleList.length === 0" image="search" tip="当前搜索无结果" />

    <template v-for="article in articleList" :key="article.id">
      <Article class="bg-white rounded-4" v-bind="article" @click="onClick" />
    </template>
  </view>
</template>

<style lang="scss" scoped>

</style>
