<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '挪车',
    enablePullDownRefresh: false,
  },
}
</route>

<script setup lang="ts">
const { VehicleProcessList } = storeToRefs(useMoveStore())
const { RunGetVehicleProcessList } = useMoveStore()

onLoad(() => {
  RunGetVehicleProcessList()
})

const tabOptions = computed(() => [
  { title: '今日', key: 'day' },
  { title: '本周', key: 'week' },
  { title: '本月', key: 'month' },
])
const current = ref('今日')
const options = computed(() => {
  return tabOptions.value.map(i => i.title)
})

function onMove() {
  uni.navigateTo({ url: '/pages/move/add' })
}
</script>

<template>
  <wd-segmented v-model:value="current" :options="options" />
  <view class="text-center">
    内容
  </view>
  <view class="flex-1 overflow-y-auto bg-pink-2">
    <template v-for="i in VehicleProcessList.rows" :key="i.vehicleProcessId">
      <Cell :title="i.name" :label="i.leftTime" :value="i.vehicleProcessId" />
      <!-- <view class="my-2 bg-white">
          <view>name:{{ i.name }}</view>
          <view>leftTime:{{ i.leftTime }}</view>
          <view>vehicleProcessId:{{ i.vehicleProcessId }}</view>
        </view> -->
    </template>
  </view>

  <wd-button size="large" @click="onMove">
    开始挪车
  </wd-button>
</template>

<style lang="scss" scoped>

</style>
