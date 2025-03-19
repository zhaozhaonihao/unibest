<route lang="json5" type="page">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '身份认证',
  },
}
</route>

<script lang="ts" setup>
import { applyRealNameVerify, queryMemberRealNameStatus } from '@/service/static/user'

const { loginSession } = storeToRefs(useUserStore())
const toast = useToast()
const form = ref()

onLoad(() => {
  run()
})

// 计算属性，返回按你名称
const btnTitle = computed(() => {
  const status = iPerson.value?.approveStatus
  if (status != null) {
    const agreementStatus = status === 0 ? '认证中' : '认证通过'
    return agreementStatus
  }
  else {
    return '提交实名认证'
  }
})

const { data: iPerson, run } = useRequest(() => queryMemberRealNameStatus(loginSession.value), { immediate: true, initialData: {
  peopleID: '',
  name: '',
  approveStatus: 0,
  approveDescription: '',
  approveTime: '',
  faceImage: '',
  backImage: '',
  agreementStatus: false,
  idNumber: '',
} })

async function onPickImg(tag: string) {
  if (iPerson.value?.approveStatus != null)
    return

  const { data, run } = useUpload({ fileBucketID: FILEBUCKETID })
  await run()
  if (tag === 'front') {
    iPerson.value.faceImage = data?.value?.filesURL ? data?.value?.filesURL : iPerson.value?.faceImage
  }
  else {
    iPerson.value.backImage = data?.value?.filesURL ? data?.value?.filesURL : iPerson.value?.backImage
  }
}

async function onSubmit() {
  console.log('onSubmit')
  const validData = await form.value?.validate()

  if (!validData.valid || iPerson.value?.approveStatus != null)
    return

  console.log('iPerson', iPerson.value)
  toast.loading('上传中...')
  try {
    await applyRealNameVerify(iPerson.value)
    toast.success('提交成功，等待审核')
    uni.navigateBack({ delta: 1 })
  }
  catch (error) {
    toast.close()
    toast.error('上传失败' + `${error.body?.msg}`)
    console.log('上传失败：', error)
  }
}

const disabled = computed(() => {
  return !iPerson.value?.name || !iPerson.value?.idNumber || !iPerson.value?.faceImage || !iPerson.value?.backImage
})

const disabledInput = computed(() => {
  return iPerson.value?.approveStatus != null
})
</script>

<template>
  <view>
    <wd-form ref="form" :model="iPerson">
      <view class="flex flex-col gap-2 p-4 ">
        <view class="title-wrap">
          <text class="c-red">
            *
          </text>
          <text class="c-[#606266] text-3">
            姓名
          </text>
        </view>
        <wd-input v-model="iPerson.name" type="idcard" custom-class="flex items-center h-9 pl-2.5" placeholder="请输入真实姓名" :disabled="disabledInput" no-border />
        <view class="mt-5" style="margin-top: 20px;">
          <text class="c-red">
            *
          </text>
          <text class="c-[#606266] text-3">
            身份证号
          </text>
        </view>
        <wd-input
          v-model="iPerson.idNumber" :disabled="disabledInput"
          type="idcard" custom-class="flex items-center h-9 pl-2.5" placeholder="请输入身份证号" prop="idNumber"
          no-border :rules="[{ required: false, pattern: /^\d{18}$/, message: '请输入18位数字' }]"
        />
        <view class="mt-5">
          <text class="c-red">
            *
          </text>
          <text class="c-[#606266] text-3">
            身份证照片
          </text>
        </view>
        <view v-if="!iPerson.faceImage" class="flex flex-col items-center justify-center h-[164px] mb-5 bg-[#eee]" @click="onPickImg('front')">
          <text class="text-[#999] text-3.5 font-semibold" style="  ">
            身份证正面
          </text>
          <text class="text-[#333] text-3 w-[70%] text-center">
            *请上传横向图片以确保图片清晰，能正确审核通过
          </text>
        </view>
        <wd-img v-else :height="164" :src="iPerson.faceImage" @click="onPickImg('front')" />
        <view v-if="!iPerson.backImage" class="flex flex-col items-center justify-center h-[164px] mb-5 bg-[#eee]" @click="onPickImg('back')">
          <text class="text-[#999] text-3.5 font-semibold">
            身份证反面
          </text>
          <text class="text-[#333] text-3 w-[70%] text-center">
            *请上传横向图片以确保图片清晰，能正确审核通过
          </text>
        </view>
        <wd-img v-else :height="164" :src="iPerson.backImage" @click="onPickImg('back')" />
        <wd-button class="mt-[22px]" type="primary" :disabled="!disabled" @click="onSubmit">
          {{ btnTitle }}
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<style lang="scss" scoped>
</style>
