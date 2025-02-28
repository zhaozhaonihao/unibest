<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '巡视点位',
  },
}
</route>

<script setup lang="ts">
import Cell from '@/components/Cell/index.vue'

import { useInspection } from '@/store'
import { storeToRefs } from 'pinia'

const { routeInstanceDotList, HandleRouteInstance } = storeToRefs(useInspection())
const {
  RunGetRouteInstanceDotList,
  UnLoadRouteInstanceDot,
} = useInspection()

onLoad(() => RunGetRouteInstanceDotList())
onUnload(() => UnLoadRouteInstanceDot())
</script>

<template>
  <view class="flex-1 overflow-y-auto bg-pink">
    <view class="flex flex-col gap-4 p-4">
      <view class="text-4 text-center font-bold">
        您今天巡视的路线是：泗泾地铁站
      </view>
      <view class="text-3">
        您需要在10分钟左右巡视完成下面的点位：
      </view>
      <template v-for="i in routeInstanceDotList" :key="i.id">
        <Cell :title="i.name" />
      </template>
    </view>
  </view>

  <view v-if="!HandleRouteInstance.realEndTime">
    <wd-button v-if="!HandleRouteInstance.realBeginTime" custom-class="w-full mt-auto!" block>
      开始巡视
    </wd-button>
    <wd-button v-else custom-class="w-full mt-auto!" block>
      完成巡视
    </wd-button>
  </view>

  <wd-gap safe-area-bottom height="0" />
</template>

<!--     <view>
      <view>BeginOneRouteInstance: {{ BeginOneRouteInstance }}</view>
      <view>EndOneRouteInstance: {{ EndOneRouteInstance }}</view>
      <view>HandleRouteInstance: {{ HandleRouteInstance }}</view>
      <view>isBegin: {{ isBegin }}</view>
      <view>isEnd: {{ isEnd }}</view>
    </view> -->
