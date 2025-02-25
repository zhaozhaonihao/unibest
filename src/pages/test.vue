<route lang="json5">
{
  style: {
    navigationBarTitleText: '测试页面',
  },
}
</route>
<template>
  <view class="h-full flex flex-col">
    <view class="flex flex-col gap-4 p-4 bg-white">
      <view class="text-6 text-center font-bold">您今天巡视的路线是：泗泾地铁站</view>
      <view class="text-4">您需要在10分钟左右巡视完成下面的点位：</view>
      <view class="text-4" v-for="(item, index) in list" :key="item.title">
        {{ index + 1 }}、{{ item.title }}
      </view>
    </view>
    <view class="flex-1"></view>
    <wd-button custom-class="w-full mt-auto!" block>开始巡视</wd-button>
  </view>
  <wd-gap safe-area-bottom height="0"></wd-gap>
</template>

<script setup lang="ts">
import { getRouteInstanceList } from '@/service/static/inspection'

const list = computed(() => {
  return [{ title: 'A出口' }, { title: 'B出口' }, { title: 'C出口' }, { title: '泗泾大润发停车场' }]
})

const { data } = useRequest(() => getRouteInstanceList('bc10dcf9302c4038952973e7729c6b69'), {
  immediate: true,
})
console.log(data)

// const noticeArticleList = computed(() => NoticeArticleList.value?.rows.map((i) => i.title))
</script>
