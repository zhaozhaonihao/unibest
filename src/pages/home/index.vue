<route lang="json5">
{
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view class="flex flex-col gap-3">
    <view class="flex gap-4 items-center h-9 px-3 bg-white rounded">
      <view class="flex flex-1" @click="onSearch">
        <view class="text-5 i-tabler:search" />
        <view class="flex-1"></view>
      </view>

      <view class="w-px h-4.5 bg-gray-400"></view>

      <view class="flex" @click.stop="onScan">
        <view class="text-5 i-tabler:scan" />
      </view>

      <view class="flex" @click.stop="onMessage">
        <view class="text-5 i-tabler:bell" />
      </view>
    </view>

    <wd-swiper :list="pictureList" autoplay :indicator="indicator"></wd-swiper>

    <wd-notice-bar
      type="info"
      prefix="notification"
      direction="vertical"
      :text="noticeArticleList"
      :delay="3"
      @click="onNotice"
    />

    <view v-if="isChengguan">城管</view>
    <view v-else>用户</view>

    <view class="flex flex-col gap-3 p-4 bg-white">
      <view class="flex justify-between">
        <view>
          <view class="i-tabler:news" />
          动态
        </view>
        <view>
          全部
          <view class="i-tabler:menu-2" />
        </view>
      </view>

      <view v-for="article in newsArticleList" :key="article.articleID" class="flex flex-col gap-3">
        <Divider />
        <Article :article="article"></Article>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {
  getFocusPictureList,
  getNavigatorSimpleArticleList,
  getNoticeArticleList,
} from '@/service/static/index'
import Divider from '@/components/Divider/index.vue'
import Article from '@/components/Article/index.vue'

import { useUserStore } from '@/store'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { isChengguan } = storeToRefs(userStore)

// 轮播图
const { data: PictureList } = useRequest(() => getFocusPictureList(), { immediate: true })
const pictureList = computed(() => PictureList.value?.rows.map((i) => i.picturePath))
const indicator = { type: 'dots-bar' } as any

// 通知
const { data: NoticeArticleList } = useRequest(() => getNoticeArticleList(), { immediate: true })
const noticeArticleList = computed(() => NoticeArticleList.value?.rows.map((i) => i.title))

// 新闻3条
const { data: NewsArticleList } = useRequest(() => getNavigatorSimpleArticleList(NAVIGATORID, 3), {
  immediate: true,
})
const newsArticleList = computed(() => NewsArticleList.value?.rows)

const onSearch = () => {
  // uni.navigateTo({ url: '/pages/home/search/index' })
  console.log('onSearch')
  uni.navigateTo({ url: '/pages/test' })
}
const onScan = () => {
  console.log('onScan')
}
const onMessage = () => {
  console.log('onMessage')
}
const onNotice = ({ index, title }) => {
  console.log('onNotice', { index, title }, NoticeArticleList.value.rows?.[index])
}
</script>

<style lang="scss" scoped>
.custom-cell .wd-cell__title {
  max-width: 200px; /* 限制标题宽度，根据实际情况调整 */
  overflow: hidden;
  text-overflow: ellipsis; /* 省略号 */
  white-space: nowrap; /* 防止换行 */
}

.custom-cell .wd-cell__label {
  line-height: 1.5; /* 适当增加行距，提高可读性 */
  word-wrap: break-word;
  white-space: normal; /* 允许换行 */
}
</style>
