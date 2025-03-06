<route lang="json5" type="home">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<script lang="ts" setup>
import Article from '@/components/Article/index.vue'
import Divider from '@/components/Divider/index.vue'

import { getFocusPictureList, getNavigatorSimpleArticleList, getNoticeArticleList } from '@/service/static'
import chengguan from './components/chengguan.vue'
import SearchWrap from './components/SearchWrap.vue'

const { isChengguan } = storeToRefs(useUserStore())

// 轮播图
const { data: PictureList } = useRequest(() => getFocusPictureList(), { immediate: true })
const pictureList = computed(() => PictureList.value?.rows.map(i => i.picturePath))
const indicator = { type: 'dots-bar' } as any

// 通知
const { data: NoticeArticleList } = useRequest(() => getNoticeArticleList(), { immediate: true })
const noticeArticleList = computed(() => NoticeArticleList.value?.rows.map(i => i.title))

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

function onSearch() {
  // uni.navigateTo({ url: '/pages/home/search/index' })
  console.log('onSearch')
  uni.navigateTo({ url: '/pages/test' })
}
function onScan() {
  console.log('onScan')
}
function onMessage() {
  console.log('onMessage')
}
function onNotice({ index, title }) {
  console.log('onNotice', { index, title }, NoticeArticleList.value.rows?.[index])
}

function onClick(id: string) {
  useOtherStore().articleID = id
  uni.navigateTo({ url: '/pages/ArticleDetail' })
}

function onAllArticle() {
  uni.navigateTo({ url: '/pages/ArticleList' })
}
</script>

<template>
  <SearchWrap @search="onSearch" @scan="onScan" @message="onMessage" />

  <view class="flex-1 overflow-y-auto flex flex-col gap-2 p-4">
    <wd-swiper :list="pictureList" autoplay :indicator="indicator" />

    <wd-notice-bar type="info" prefix="notification" direction="vertical" :text="noticeArticleList" :delay="3" @click="onNotice" />

    <chengguan v-if="isChengguan" />
    <view v-else>
      用户
    </view>

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
        <Divider />

        <Article v-bind="news" @click="onClick" />
      </view>
    </view>
  </view>
</template>
