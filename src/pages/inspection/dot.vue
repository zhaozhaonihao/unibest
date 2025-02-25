<route lang="json5">
{
  style: {
    navigationBarTitleText: '巡视点位',
  },
}
</route>
<template>
  <view>
    巡视点位

    <view>{{ InstanceList.length }}</view>
  </view>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store'
import { getRouteInstanceDotList } from '@/service/static/inspection'

const userStore = useUserStore()

onLoad(async ({ routeDefineID }) => {
  console.log(routeDefineID)
  console.log(userStore)

  //   const { run } = useRequest(() => getRouteInstanceDotList(routeDefineID))

  //   InstanceList.value = await run()
})
const InstanceList = ref([])

console.log('InstanceList', InstanceList.value)
</script>
