<route lang="json5">
    {
      layout: 'page',
      style: {
        navigationBarTitleText: '搜索',
      },
    }
</route>

<script setup>
import { useSearchStore } from '@/store/search'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { ref } from 'vue'

const { articlekeyWords } = storeToRefs(useOtherStore())
const { searchHistoryWordList, HotWordData } = storeToRefs(useSearchStore())
const { RunGetHotWordList } = useSearchStore()
const { RunGetArticleList } = useOtherStore()
const searchValue = ref('')
const hotWords = ref([])
const historys = ref([])

onLoad(() => {
  getHotWord()
})

onShow(() => {
  const list = uni.getStorageSync('history_keys') || []
  historys.value = list
})

async function onSearch(e) {
  console.log('onSearch', e)
  const keyWord = e?.value?.trim()
  if (!keyWord)
    return

  articlekeyWords.value = keyWord
  await RunGetArticleList()
  uni.navigateTo({ url: `/pages/ArticleList` })
  if (searchValue.value?.length)
    searchValue.value = ''
  searchHistoryWordList.value = searchHistoryWordList.value.filter(item => item !== keyWord)
  searchHistoryWordList.value.splice(0, 0, keyWord)
}

async function getHotWord() {
  await RunGetHotWordList()
  console.log('热词', HotWordData.value)
  hotWords.value = HotWordData.value.rows
}

function onRemove(key) {
  console.log('onRemove', key)
  searchHistoryWordList.value = searchHistoryWordList.value.filter(item => item !== key)
}

function onClear() {
  searchHistoryWordList.value = []
}

function change(e) {
  console.log(e)
}
</script>

<template>
  <wd-search v-model="searchValue" placeholder-left placeholder="请输入关键字" hide-cancel @search="onSearch" @change="change" />
  <view class="flex flex-col">
    <text class="p-4">
      热门搜索
    </text>
    <view class="gap-5 flex-wrap flex-1 flex flex-row">
      <view v-for="item in hotWords" :key="item.hotWordID" class="text-4 rounded-[2px] text-[#666] m-1 p-2 p-1 leading-6 bg-[#eee] tag-item" @click="onSearch({ value: item.name })">
        {{ item.name }}
      </view>
    </view>
    <view class="justify-between flex-row flex gap-3">
      <text class="p-4">
        历史搜索
      </text>
      <view class="flex-row items-center flex" @click="onClear">
        <view class="i-tabler:trash text-blue-5" />
        <text>清空</text>
      </view>
    </view>
    <view class="w-full h-[0.5px] bg-blueGray" style="margin-bottom: 12px;" />
    <view class="flex flex-row">
      <view v-for="item in searchHistoryWordList" :key="item" class="gap-5 flex-wrap relative text-4 rounded-[2px] text-[#666] m-1 p-3  leading-6 bg-[#eee] tag-item bottom-2">
        <text @click="onSearch({ value: item })">
          {{ item }}
        </text>
        <view class="right-0 top-0 absolute" @click="onRemove(item)">
          <wd-icon name="close-outline" size="12px" />
        </view>
      </view>
    </view>
  </view>
</template>
