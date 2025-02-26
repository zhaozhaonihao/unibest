<route lang="json5">
{
  style: {
    navigationBarTitleText: '巡视点位',
  },
}
</route>

<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()

onLoad(async ({ routeDefineID }) => {
  console.log(routeDefineID)
  console.log(userStore)
  // routeDefineID
  // routeDefineDotID
  // routeInstanceID

  //   const { run } = useRequest(() => getRouteInstanceDotList(routeDefineID))

  //   InstanceList.value = await run()
})
const InstanceList = ref([])

console.log('InstanceList', InstanceList.value)
</script>

<template>
  <view>
    巡视点位

    <view>{{ InstanceList.length }}</view>
  </view>
</template>
