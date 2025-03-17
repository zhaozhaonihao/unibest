<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '巡视点 RouteInstanceDot',
  },
}
</route>

<script lang="ts" setup>
import type { CheckOneDot } from '@/service/static/inspection'
import Divider from '@/components/Divider/index.vue'
import { checkOneRouteInstanceDot, comeOneRouteInstanceDot } from '@/service/static/inspection'

import headerWrap from './components/headerWrap.vue'

const message = useMessage()
const toast = useToast()

const { LocationInfo, employeeList, handleEmployee } = storeToRefs(useOtherStore())
const { GetLocation, RunGetEmployeeList } = useOtherStore()

const {
  HandleRouteInstanceDot,
  HeaderOptions,
} = storeToRefs(useInspection())
const {
  UnLoadDot,
  RunGetRouteInstanceDotList,
} = useInspection()

onLoad(() => {
  GetLocation()
  // 到达巡视点
  if (!HandleRouteInstanceDot.value.comeTimeStr) {
    comeOneRouteInstanceDot({
      routeInstanceDotID: HandleRouteInstanceDot.value.id,
    })
  }
})
onUnload(() => UnLoadDot())

const ImageList = ref<string[]>([])
const ImgNum = computed(() => ImageList.value.length ? `${ImageList.value.length}` : '')
const { loading, run: RunUpload } = useUpload({ fileBucketID: FILEBUCKETID })

async function onImage() {
  const ImageData = await RunUpload()
  ImageData && ImageList.value.unshift(ImageData.filesURL)
}

function RmImageList(idx: number) {
  message.confirm({ msg: '是否删除当前图片', title: '提示' }).then(() => {
    ImageList.value?.splice(idx, 1)
    toast.success('删除成功')
  })
}

/** 检查巡检点 表单数据 */
const checkDotParams = reactive<CheckOneDot>({
  routeInstanceDotID: HandleRouteInstanceDot.value.id,
  resultType: 1,
  realMapX: `${LocationInfo.value.lon}`,
  realMapY: `${LocationInfo.value.lat}`,
  resultMemo: '',
  problemNumber: '',
  imageNumber: '',
})

async function onNext(isImage: boolean) {
  if (isImage && !ImageList.value.length) {
    return toast.error('至少上传一张图片')
  }
  checkDotParams.imageNumber = ImgNum.value
  checkDotParams.problemNumber = `${checkDotParams.problemNumber}`
  await checkOneRouteInstanceDot(checkDotParams)
  await RunGetRouteInstanceDotList()
  uni.navigateBack()
}

function onExcept() {
  checkDotParams.resultType = 2
  // 获取挪车人员
  RunGetEmployeeList()
}
async function onPhone(e: { selectedItems: { phone: string } }) {
  console.log('onPhone', e.selectedItems.phone)

  uni.makePhoneCall({
    phoneNumber: e.selectedItems.phone,
  })
}
</script>

<template>
  <headerWrap :options="HeaderOptions" />

  <view class="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
    <view class="flex flex-col gap-2 p-4 rounded-5 bg-white">
      <view>巡视标准：</view>
      <view>电动车停放有序，不超出停车线</view>
      <view>如果有超出停车线的，请及时摆正</view>
      <view>如果电动车过多，难以摆正，请呼叫挪车人员</view>
    </view>

    <template v-if="checkDotParams.resultType === 2">
      <Divider />

      <view class="p-4 rounded-5 bg-white">
        <view class="flex gap-4 justify-between items-center mb-2">
          <text class="font-bold">
            异常个数:
          </text>
          <wd-input-number v-model="checkDotParams.problemNumber" />
        </view>

        <view class="flex gap-4 items-center">
          <text class="font-bold">
            异常描述:
          </text>
          <wd-textarea v-model="checkDotParams.resultMemo" custom-class="flex-1" clear-trigger="focus" clearable auto-height />
        </view>
      </view>

      <Divider />

      <view class=" bg-white p-4 rounded-5">
        <view class="text-4 font-bold mb-2">
          异常情况拍照（1~4张图片）
        </view>
        <view class="p-2 text-center bg-[#f1f1f1]">
          已上传 {{ ImageList.length }} 张图片
        </view>

        <view class="flex-1 overflow-y-auto flex flex-col gap-4">
          <template v-for="(src, idx) in ImageList" :key="src">
            <wd-img class="w-full" mode="widthFix" :src="src" enable-preview @longpress="RmImageList(idx)" />
          </template>
        </view>
      </view>
    </template>
  </view>

  <view>
    <template v-if="checkDotParams.resultType === 2">
      <wd-picker v-model="handleEmployee" :columns="employeeList" label="呼叫挪车人员" @confirm="onPhone" />
      <view class="flex justify-between gap-2">
        <wd-button custom-class="flex-1" size="large" @click="onImage">
          拍照
        </wd-button>
        <wd-button custom-class="flex-1" size="large" @click="onNext(true)">
          完成当前点位巡视
        </wd-button>
      </view>
    </template>
    <template v-else>
      <view class="flex justify-between gap-2">
        <wd-button custom-class="flex-1" size="large" @click="onExcept">
          异常
        </wd-button>
        <wd-button custom-class="flex-1" size="large" @click="onNext(false)">
          完成当前点位巡视
        </wd-button>
      </view>
    </template>
  </view>

  <wd-overlay :show="loading">
    <view class="flex items-center justify-center h-full">
      <wd-loading />
    </view>
  </wd-overlay>
</template>

<style lang="scss" scoped>

</style>
