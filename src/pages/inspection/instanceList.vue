<route lang="json5">
  {
    style: {
      navigationBarTitleText: '巡视列表',
    },
  }
  </route>

<script setup lang="ts">
import {
  getRouteInstanceList,
} from '@/service/static/inspection'
import { useUserStore } from '@/store'
import dayjs from 'dayjs'

const userStore = useUserStore()

const RouteDefineID = ref<string>()
onLoad(async ({ routeDefineID }) => {
  RouteDefineID.value = routeDefineID
  /**
   * 开始日期，结束日期 beginTime endTime
      sortTypeName：1：按name正序，2倒序
      sortTypeOrder：1 按 orderSeq 正序，2倒序
      sortTypeTime 1：按时间正序，2倒序
   */
  RouteList()
})

// 巡视列表
const { data: InstanceList, run: RouteList } = useRequest(() =>
  getRouteInstanceList(RouteDefineID.value, userStore.MyCompanyAndEmployeeList[0].employeeID),
)
console.log(InstanceList.value)

async function createOneRoute() {
  console.log(InstanceList.value.rows[0].routeDefineName)

  // const employeeID = userStore.MyCompanyAndEmployeeList[0].employeeID
  console.log(userStore.OneMemberDetail)

  const name = ref('第一次巡视')
  if (InstanceList.value.rows.length > 0) {
    name.value = `${InstanceList.value.rows[0].routeDefineName}__${dayjs().format('MM-DD HH:MM:ss')}`
  }

  console.log(name.value)

  // const { run: RouteInstance } = useRequest(() =>
  //   createOneRouteInstance(RouteDefineID.value, employeeID, name.value),
  // )
  // const res = await RouteInstance()
  // console.log(res)
}
</script>

<template>
  <view class="h-full flex flex-col">
    <view class="">
      <template v-for="item in InstanceList?.rows" :key="item.routeInstanceID">
        <wd-cell :title="item.name" :label="item.routeDefineName" :value="item.employeeName" />
      </template>
    </view>

    <view class="flex-1" />

    <wd-button custom-class="w-full mt-auto!" size="large" block @click="createOneRoute">
      创建新的巡视
    </wd-button>
  </view>
</template>
