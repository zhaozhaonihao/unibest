<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '查车',
    enablePullDownRefresh: true,
  },
}
</route>

<script lang="ts" setup>
import vehicleInfo from '@/pages/vehicle/components/info.vue'
import Illicit from './components/Illicit.vue'

const message = useMessage()

const {
  vehicleItem,

} = storeToRefs(useVehicleFeatureStore())
const {
  UnLoad,
} = useVehicleFeatureStore()

const {
  VehicleList,
  vehicleList,
  getVehicleParams,
} = storeToRefs(useVehicleStore())

const {
  RunGetVehicleList,
} = useVehicleStore()

onLoad(() => load())
onUnload(() => unload())

onPullDownRefresh(() => {
  unload()
  load()

  uni.stopPullDownRefresh()
})

function load() {
  vehicleInfoVisible.value = false
}
function unload() {
  getVehicleParams.value = undefined
  VehicleList.value = undefined

  sequenceCode.value = undefined
  UnLoad()
}

/** 特征查车可见 */
const vehicleInfoVisible = ref(false)
/** 车牌号 */
const sequenceCode = ref<string | undefined>()

function onClickIcon() {
  console.log('照相按钮')
}

async function onSearch() {
  getVehicleParams.value = undefined

  if (vehicleInfoVisible.value) {
    getVehicleParams.value = {}
    // 品牌
    getVehicleParams.value.brandName = vehicleItem.value.brandName === ''
      ? undefined
      : vehicleItem.value.brandName
    // 颜色
    getVehicleParams.value.color = vehicleItem.value.color === ''
      ? undefined
      : vehicleItem.value.color
    // 挡风
    getVehicleParams.value.isWind = vehicleItem.value.isWind
    getVehicleParams.value.windColor = vehicleItem.value.windColor === ''
      ? undefined
      : vehicleItem.value.windColor
    getVehicleParams.value.windPattern = vehicleItem.value.windPattern === ''
      ? undefined
      : vehicleItem.value.windPattern
    // 尾箱
    getVehicleParams.value.isBox = vehicleItem.value.isBox
    getVehicleParams.value.boxColor = vehicleItem.value.boxColor === ''
      ? undefined
      : vehicleItem.value.boxColor

    getVehicleParams.value.sizeType = vehicleItem.value.sizeType
    getVehicleParams.value.useType = vehicleItem.value.useType
  }
  else {
    getVehicleParams.value = {}

    getVehicleParams.value.sequenceCode = sequenceCode.value
  }

  const data = await RunGetVehicleList()
  if (!data?.rows.length)
    message.confirm({ title: '暂无数据' })
  else
    vehicleInfoVisible.value = false
}
</script>

<template>
  <view class="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
    <template v-for="item in vehicleList" :key="item.id">
      <Illicit v-bind="item" />
    </template>
    <wd-status-tip v-if="!vehicleList.length" image="search" tip="暂无数据" />
  </view>

  <view class="p-4 flex flex-col gap-4">
    <!-- 车牌查询 -->
    <wd-input
      v-if="!vehicleInfoVisible"
      v-model="sequenceCode"
      custom-class="p-2"
      custom-input-class="text-center"
      placeholder="请输入车牌号"
      :cursor-spacing="10"
      confirm-type="search"
      no-border
      @confirm="onSearch"
    >
      <template #suffix>
        <view class="i-tabler:camera" @click="onClickIcon" />
      </template>
    </wd-input>

    <!-- 特征查车 -->
    <vehicleInfo v-show="vehicleInfoVisible" />

    <wd-button custom-class="w-full" size="large" block @click="onSearch">
      查询
    </wd-button>

    <wd-button v-show="!vehicleInfoVisible" custom-class="w-full" plain size="large" block @click="vehicleInfoVisible = !vehicleInfoVisible">
      特征查车
    </wd-button>
  </view>
</template>

<style scoped lang="scss">

</style>
