<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '拍照',
  },
}
</route>

<script setup lang="ts">
// import { useToast } from 'wot-design-uni'

// const toast = useToast()
const { vehicleProcessID, moveImg, BeginOneVehicleProcess } = storeToRefs(useMoveTask())
const { RunBeginOneVehicleProcess } = useMoveTask()

const images = ref([
  { label: '拍摄车牌', src: 'http://3onepicture.3onedataqz.com/cb6babc33a2044d89942ffc84db90502.jpg', placeholder: '/static/img/move/front_outline.png' },
  { label: '拍摄后面', src: 'http://3onepicture.3onedataqz.com/eda7327a142c4bd5995a8e7be4c3fb3c.jpg', placeholder: '/static/img/move/back_outline.png' },
  { label: '拍摄侧面', src: '', placeholder: '/static/img/move/flank_outline.png' },
  { label: '拍摄前面', src: '', placeholder: '/static/img/move/front_outline.png' },
])

const canRecognize = ref(false) // 控制“识别车辆信息”按钮是否可用

// 选择图片并上传
async function takePhoto(index: number) {
  uni.chooseImage({
    count: 1,
    success: async (res) => {
      images.value[index].src = res.tempFilePaths[0]
      checkCanRecognize()
    },
  })
}

// 删除图片
// function removeImage(index: number) {
//   images.value[index].src = ''
//   checkCanRecognize()
// }

// 检查是否已拍摄所有图片，决定“识别车辆信息”按钮是否可用
function checkCanRecognize() {
  canRecognize.value = images.value.every(item => item.src !== '')
}

// // 识别车辆信息
// function recognizeVehicle() {
//   if (!canRecognize.value)
//     return
//   toast.success('正在识别车辆信息...')
// }

// const ImageCroppingVisible = ref(false)

async function OnBeain() {
  await RunBeginOneVehicleProcess()
  console.log('BeginOneVehicleProcess', BeginOneVehicleProcess.value)
}
</script>

<template>
  <view class="text-center">
    {{ vehicleProcessID }}
  </view>
  <wd-button custom-class="w-full my-2" size="large" @click="OnBeain">
    开始一个车辆处理 beginOneVehicleProcess
  </wd-button>
  <text class="text-lg font-bold">
    shi
  </text>

  <view class="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
    <view v-for="(item, index) in moveImg" :key="index" class="flex flex-col items-center justify-center bg-gray-200" @click="takePhoto(index)">
      <view class="w-full rounded-md text-center">
        <wd-img v-if="item.src" :src="item.src" custom-class="w-full rounded-md" mode="widthFix" />
        <wd-img v-else :src="item.placeholder" custom-class="w-full rounded-md" mode="widthFix" />
      </view>
    </view>
  </view>

  <wd-button custom-class="w-full my-2" size="large">
    识别车辆信息
  </wd-button>

  <wd-gap safe-area-bottom height="0" />
  <!-- <text class="text-lg font-bold">
      请按照下面格式进行拍照
    </text>

    <view v-for="(item, index) in images" :key="index" class="flex flex-col items-center justify-center">
      <wd-img v-if="item.src" :src="item.src" class="w-full h-40 rounded-md object-cover" enable-preview />
      <image v-else :src="item.placeholder" class="w-full h-40 rounded-md opacity-50" />

      <wd-button type="primary" @click="takePhoto(index)">
        📸 {{ item.label }}
      </wd-button>

      <wd-button v-if="item.src" size="small" class="mt-2" @click="removeImage(index)">
        删除
      </wd-button>
    </view>

    <wd-button
      :disabled="!canRecognize"
      type="primary"
      size="large"
      class="mt-4 w-full"
      @click="recognizeVehicle"
    >
      识别车辆信息
    </wd-button> -->

  <!-- 图片裁剪 -->
  <!-- <wd-img-cropper
    v-model="ImageCroppingVisible"
    :img-src="src"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  /> -->
</template>

<style scoped>
</style>

<style lang="scss" scoped>

</style>
