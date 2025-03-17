<route lang="json5" type="page">
  {
    layout: 'page',
    style: {
      navigationBarTitleText: '登录',
    },
  }
</route>

<script lang="ts" setup>
import { getWeixinMemberPhone, searchMemberByPhone } from '@/service/static/login'

onUnload(() => closePopup())

const { handleAuth } = useUserStore()

const isAgree = ref(false)
const registerPopup = ref(true)

const phoneNumber = ref('')
const nickname = ref('')

async function getPhoneNumber(a) {
  console.log('AAAAAAAAAAAAAAAAAAA', a)

  const { errMsg, encryptedData, iv } = a
  if (errMsg !== 'getPhoneNumber:ok')
    return console.error('获取手机号失败')

  try {
    const { code } = await uni.login({ provider: 'weixin' })
    // 获取手机号
    const { phoneNumber } = await getWeixinMemberPhone({ encryptedData, iv, js_code: code })

    if (phoneNumber) {
      const { phone } = await searchMemberByPhone(phoneNumber)

      if (phone && phone === phoneNumber) {
        console.log('已注册，登录')
        handleAuth('wxLogin')
        uni.navigateBack()
      }
      else {
        console.log('手机号未在系统注册')
        registerPopup.value = true
      }
    }
    else {
      console.error('解析手机号失败')
      const toast = useToast()
      toast.error('解析手机号失败')
    }
  }
  catch (error) {
    console.error('操作失败', error)
  }
}

async function onRegister() {
  await handleAuth('wxRegister', { phone: phoneNumber.value, name: nickname.value })
  uni.navigateBack()
}

function changeAgree({ detail: { value } }) {
  isAgree.value = value.length > 0
}
function closePopup() {
  phoneNumber.value = ''
  nickname.value = ''
}
</script>

<template>
  <view class="flex-1 flex flex-col items-center gap-4">
    <view class="size-20 flex justify-center items-center bg-[#1e7aff] rounded-50 mt-10">
      <view class="w-[80%] h-[80%] i-tabler:user-filled bg-white" />
    </view>

    <view class="w-full h-[0.5px] bg-blueGray" />

    <text class="text-lg font-semibold">
      智能导寻
    </text>

    <text class="text-gray-600 mb-4">
      申请授权登录
    </text>

    <checkbox-group @change="changeAgree">
      <label class="flex items-center">
        <checkbox :checked="isAgree" />
        <text>同意并接受</text>
        <navigator url="/pages/mine/privacy" class="text-blue-5" @click.stop>《隐私协议》</navigator>
        <text> 和 </text>
        <navigator url="/pages/mine/register" class="text-blue-5" @click.stop>《注册协议》</navigator>
      </label>
    </checkbox-group>

    <wd-button class="w-[50%]" block open-type="getPhoneNumber" :disabled="!isAgree" @getphonenumber="getPhoneNumber">
      授权登录
    </wd-button>
  </view>

  <wd-popup v-model="registerPopup" custom-class="rounded-4" @close="closePopup">
    <view class="flex flex-col items-center bg-[#fff] rounded-2 p-4">
      <view class="size-20 flex justify-center items-center bg-[#1e7aff] rounded-50">
        <view class="w-[80%] h-[80%] i-tabler:user-filled bg-white" />
      </view>
      <view class="w-60 flex flex-col">
        <input v-model="nickname" type="nickname" placeholder="请输入昵称" class="border-b-[1px] border-b-solid border-b-[#dbdbdb] p-2">
        <text class="c-pink text-3 p-2">
          *以英文字母或者汉字开头
        </text>
        <text class="c-pink text-3  p-2">
          *限4-16个字符,一个汉字为2个字符
        </text>
      </view>
      <wd-button :disabled="!nickname.length" class="w-5 p-2" @click="onRegister">
        注册
      </wd-button>
    </view>
  </wd-popup>
</template>

  <style lang="scss" scoped>

  </style>
