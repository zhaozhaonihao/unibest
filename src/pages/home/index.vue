<route lang="json5">
{
  type: 'home',
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

const userStore = useUserStore()
const { isChengguan } = storeToRefs(userStore)

// 轮播图
const { data: PictureList } = useRequest(() => getFocusPictureList(), { immediate: true })
const pictureList = computed(() => PictureList.value?.rows.map(i => i.picturePath))
const indicator = { type: 'dots-bar' } as any

// 通知
const { data: NoticeArticleList } = useRequest(() => getNoticeArticleList(), { immediate: true })
const noticeArticleList = computed(() => NoticeArticleList.value?.rows.map(i => i.title))

// 新闻3条
const { data: NewsArticleList } = useRequest(() => getNavigatorSimpleArticleList(NAVIGATORID, 3), { immediate: true })
const newsArticleList = computed(() => NewsArticleList.value?.rows)

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
</script>

<template>
  <view class="flex flex-col gap-3 p-4">
    <SearchWrap @search="onSearch" @scan="onScan" @message="onMessage" />

    <wd-swiper :list="pictureList" autoplay :indicator="indicator" />

    <wd-notice-bar type="info" prefix="notification" direction="vertical" :text="noticeArticleList" :delay="3" @click="onNotice" />

    <chengguan v-if="isChengguan" />
    <view v-else>
      用户
    </view>

    <view class="flex flex-col gap-3 p-4 bg-white">
      <view class="flex justify-between items-center">
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

        <Article :article="article" />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.custom-cell .wd-cell__title {
  max-width: 200px;
  /* 限制标题宽度，根据实际情况调整 */
  overflow: hidden;
  text-overflow: ellipsis;
  /* 省略号 */
  white-space: nowrap;
  /* 防止换行 */
}

.custom-cell .wd-cell__label {
  line-height: 1.5;
  /* 适当增加行距，提高可读性 */
  word-wrap: break-word;
  white-space: normal;
  /* 允许换行 */
}
</style>
