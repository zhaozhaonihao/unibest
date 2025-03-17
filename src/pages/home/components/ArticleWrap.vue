<script lang="ts" setup>
import Article from '@/components/Article/index.vue'
import { getNavigatorSimpleArticleList } from '@/service/static'

// 新闻3条
const { data: NewsArticleList } = useRequest(() => getNavigatorSimpleArticleList(NAVIGATORID, 3), { immediate: true })
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

function onAllArticle() {
  uni.navigateTo({ url: '/pages/ArticleList' })
}
</script>

<template>
  <view class="flex flex-col gap-3 p-4 bg-white">
    <view class="flex justify-between items-center">
      <view class="flex items-center">
        <text class="i-tabler:news" />
        <text>动态</text>
      </view>
      <view class="flex items-center" @click="onAllArticle">
        <text>全部</text>
        <text class="i-tabler:menu-2" />
      </view>
    </view>

    <view v-for="news in newsArticleList" :key="news.id" class="flex flex-col gap-3">
      <view class="w-full h-[0.5px] bg-blueGray" />

      <Article v-bind="news" @click="onClick" />
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
