<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '巡视列表',
  },
}
</route>

<script setup lang="ts">
import Cell from '@/components/Cell/index.vue'

import { createOneRouteInstance } from '@/service/static/inspection'
import { useInspection, useUserStore } from '@/store'
import dayjs from 'dayjs'

import { storeToRefs } from 'pinia'

const { MyCompanyAndEmployeeList } = storeToRefs(useUserStore())
const { HandleRouteDefine, routeInstanceList, handleRouteInstance } = storeToRefs(useInspection())
const { RunGetRouteInstanceList, UnLoadRouteInstance } = useInspection()

onLoad(() => {
  RunGetRouteInstanceList()
})

onUnload(() => {
  UnLoadRouteInstance()
})

const employeeID = computed(() => MyCompanyAndEmployeeList.value[0].employeeID)

async function createOneRoute() {
  const name = computed(() => {
    const res = HandleRouteDefine.value.label || '第一次巡视'
    return `${res}__${dayjs().format('MM-DD HH:MM:ss')}` || '第一次巡视'
  })

  console.log('创建新的巡视', employeeID.value, HandleRouteDefine.value.value, name.value)

  // console.log(name.value)

  // const { run } = useRequest(() => )
  const res = await createOneRouteInstance({
    routeDefineID: HandleRouteDefine.value.value,
    name: name.value,
    // employeeID: employeeID.value,
  })
  console.log(res)
  RunGetRouteInstanceList()
  // 53d30ea3aa8d49f5b3629c00b76494a5
  // const res = await RouteInstance()
  // console.log(res)
}

function onClick(idx: number) {
  handleRouteInstance.value = idx
  uni.navigateTo({ url: '/pages/inspection/dot' })
}
</script>

<template>
  <view class="text-center pt-4">
    当前路线：{{ HandleRouteDefine.label }}
  </view>
  <view class="flex-1 flex flex-col gap-4 overflow-y-auto h-full py-4">
    <template v-for="(i, idx) in routeInstanceList" :key="i.routeInstanceID">
      <Cell :title="i.title" :label="i.label" :value="i.value" @click="onClick(idx)" />
    </template>
  </view>

  <wd-button custom-class="w-full mt-auto!" size="large" block @click="createOneRoute">
    创建新的巡视
  </wd-button>

  <wd-gap safe-area-bottom height="0" />
</template>

<style scoped lang="scss">
.cell-icon {
  display: block;
  box-sizing: border-box;
  padding: 4px 0;
  width: 16px;
  height: 24px;
  margin-right: 4px;
  background: url('https://img10.360buyimg.com/jmadvertisement/jfs/t1/71075/7/3762/1820/5d1f26d1E0d600b9e/a264c901943080ac.png')
    no-repeat;
  background-size: cover;
}

:deep(.custom-value) {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(0, -50%);
  white-space: nowrap;
}

.custom-text {
  color: #f0883a;
}

.end-time {
  display: inline-block;
  margin-left: 8px;
  border: 1px solid #faa21e;
  padding: 0 4px;
  font-size: 10px;
  color: #faa21e;
}
</style>
