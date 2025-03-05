<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '选择路线 RouteDefine',
  },
}
</route>

<script setup lang="ts">
import Cell from '@/components/Cell/index.vue'

const { handleRouteDefineIdx, routeDefine } = storeToRefs(useInspection())
const { RunGetRouteDefineList, UnLoadRouteDefine } = useInspection()

onLoad(() => RunGetRouteDefineList())
onUnload(() => UnLoadRouteDefine())
function onClick(idx: number) {
  handleRouteDefineIdx.value = idx

  uni.navigateTo({ url: '/pages/inspection/list' })
}
</script>

<template>
  <view class="flex flex-col gap-4 p-4">
    <Cell v-for="(item, idx) in routeDefine" :key="item.value" :title="item.label" @click="onClick(idx)" />
  </view>
</template>
