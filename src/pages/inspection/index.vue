<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '选择路线',
  },
}
</route>

<script setup lang="ts">
import Cell from '@/components/Cell/index.vue'
import { useInspection } from '@/store'
import { storeToRefs } from 'pinia'

const { handleRouteDefine, routeDefine } = storeToRefs(useInspection())
const { RunGetRouteDefineList, UnLoadRouteDefine } = useInspection()

onLoad(() => RunGetRouteDefineList())
onUnload(() => UnLoadRouteDefine())
function onClick(idx: number) {
  handleRouteDefine.value = idx

  uni.navigateTo({ url: '/pages/inspection/instanceList' })
}
</script>

<template>
  <view class="flex-1 flex flex-col justify-center gap-4 p-4">
    <Cell v-for="(item, idx) in routeDefine" :key="item.value" :title="item.label" @click="onClick(idx)" />
  </view>
</template>
