<route lang="json5" type="page">
  {
    layout: 'page',
    style: {
      navigationBarTitleText: '搜索',
    },
  }
</route>

<script setup lang="ts">
import { getHotWordList } from '@/service/static/search'

const { articleParams } = storeToRefs(useArticleStore())
const { data: HotWordData, run: RunGetHotWordList } = useRequest(() => getHotWordList())

onLoad(() => RunGetHotWordList())

/** 搜索值 */
const searchValue = ref('')
/** 历史记录 */
const searchHistoryWordList = ref<string[]>([])
/** 热词处理 */
const hotWordData = computed(() => HotWordData.value?.rows.map(i => ({ id: i.id, name: i.name })) || [])
/** 搜索 */
async function onSearch(e: { value: string }) {
  const keyWord = e.value?.trim()
  if (!keyWord)
    return

  articleParams.value = articleParams.value || {}
  articleParams.value.keyWords = keyWord
  uni.navigateTo({ url: '/pages/ArticleList' })

  searchValue.value = ''
  searchHistoryWordList.value = Array.from(new Set([keyWord, ...searchHistoryWordList.value]))
}

function onRemove(idx: number) {
  searchHistoryWordList.value.splice(idx, 1)
}

function onClear() {
  searchHistoryWordList.value = []
}
</script>

<template>
  <wd-search v-model="searchValue" placeholder-left placeholder="请输入关键字" hide-cancel @search="onSearch" />

  <view class="flex flex-col gap-4 p-4">
    <text>热门搜索</text>

    <view class="flex-1 flex flex-wrap gap-2">
      <template v-for="item in hotWordData" :key="item.hotWordID">
        <wd-tag round type="primary" custom-class="py-1.5!" @click="onSearch({ value: item.name })">
          {{ item.name }}
        </wd-tag>
      </template>
    </view>

    <view class="flex justify-between">
      <text>历史搜索 </text>
      <view class="flex flex-row items-center text-blue-5" @click="onClear">
        <view class="i-tabler:trash" />
        <text>清空</text>
      </view>
    </view>

    <view class="w-full h-[0.5px] bg-blueGray" />

    <view class="flex flex-wrap gap-2">
      <template v-for="(name, idx) in searchHistoryWordList" :key="name">
        <wd-tag closable round type="primary" custom-class="flex! gap-2 py-1.5!" @click="onSearch({ value: name })" @close="onRemove(idx)">
          {{ name }}
        </wd-tag>
      </template>
    </view>
  </view>
</template>

<style lang="scss" scoped>
:deep(.wd-tag__close) {
  margin: 0 !important;
}
</style>
