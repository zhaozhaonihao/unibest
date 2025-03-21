<route lang="json5" type="page">
  {
    layout: 'page',
    style: {
      navigationBarTitleText: '操作手册',
    },
  }
</route>

<script lang="ts" setup>
import Article from '@/components/Article/index.vue'
import { getNavigatorSimpleArticleList } from '@/service/static'

const id = ref('')
onLoad((operation) => {
  const { name } = operation
  id.value = name
  console.log('operation', id.value)
  runNewsArticleList()
})
// 新闻3条
const { data: NewsArticleList, run: runNewsArticleList } = useRequest(() => getNavigatorSimpleArticleList(id.value))
const newsArticleList = computed(() => {
  return NewsArticleList.value?.rows?.map((i) => {
    return {
      id: i.articleID,
      title: i.title,
      src: i.faceImage,
      desc: i.description,
      time: i.createdTimeStr,
    }
  })
})
function onClick(id: string) {
  useArticleStore().articleID = id
  uni.navigateTo({ url: '/pages/ArticleDetail' })
}
</script>

<template>
  <view class="flex flex-col gap-3 p-4">
    <template v-for="news in newsArticleList" :key="news.id">
      <Article class="bg-white rounded-4" v-bind="news" @click="onClick" />
    </template>
  </view>
</template>

<style lang="scss" scoped>

</style>
