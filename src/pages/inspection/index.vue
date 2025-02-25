<route lang="json5">
{
  style: {
    navigationBarTitleText: '巡视记录',
  },
}
</route>
<template>
  <view class="h-full flex flex-col">
    <view>巡视列表</view>
    <view>
      {{ routeDefineID }}
    </view>

    <view class="flex-1"></view>

    <wd-picker
      v-model="routeDefineID"
      :columns="routeDefine"
      confirm-button-text="开始巡视"
      use-default-slot
      @confirm="onInspection"
    >
      <wd-button custom-class="w-full mt-auto!" size="large" block>巡视</wd-button>
    </wd-picker>
  </view>
</template>

<script setup lang="ts">
import { getRouteDefineList, createOneRouteInstance } from '@/service/static/inspection'
import { getMyCompanyAndEmployeeList, getOneMemberDetail } from '@/service/static/login'
import { useUserStore } from '@/store'

const userStore = useUserStore()

const { data: RouteDefine } = useRequest(() => getRouteDefineList(), {
  immediate: true,
})
const routeDefineID = ref<string>()
const routeDefine = computed(() => {
  return RouteDefine.value?.rows.map((i) => ({ value: i.routeDefineID, label: i.name }))
})

const onInspection = async (e: { value: string; selectedItems: (typeof routeDefine.value)[0] }) => {
  console.log('onInspection', e)
  // uni.navigateTo({ url: `/pages/inspection/dot?routeDefineID=${e.value}` })

  // const { data: RouteDefine } = useRequest(() => getOneMemberDetail(), {
  //   immediate: true,
  // })
  // console.log(RouteDefine.value)
  // const phone = 'phone'
  const { run: RouteInstance } = useRequest(() =>
    createOneRouteInstance(
      e.value,
      userStore.CompanyAndEmployeeList.employeeID,
      e.selectedItems.label + '2',
    ),
  )

  const res = await RouteInstance()
  console.log(res)
}
</script>
