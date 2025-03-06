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

const { articlekeyWords, articleList } = storeToRefs(useOtherStore())
const { RunGetArticleList } = useOtherStore()

onLoad(() => {
  if (!articlekeyWords.value)
    RunGetArticleList()
})
onUnload(() => {
  articlekeyWords.value = undefined
})

console.log(articleList.value)

function onClick(id: string) {
  useOtherStore().articleID = id
  uni.navigateTo({ url: '/pages/ArticleDetail' })
}
</script>

<template>
  <view class="flex-1 p-4 flex flex-col gap-4">
    <template v-for="article in articleList" :key="article.id">
      <Article class="bg-white rounded-4" v-bind="article" @click="onClick" />
    </template>
  </view>
</template>

<style lang="scss" scoped>

</style>
