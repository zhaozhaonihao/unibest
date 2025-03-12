<route lang="json5">
  {
    style: {
      navigationBarTitleText: '授权登录',
    },
  }
  </route>

<script setup lang="ts">
import { getWeixinMemberPhone, searchMemberByPhone } from '@/service/static/login'
import { updateMyMemberAvatar } from '@/service/static/user'
import { useUserStore } from '@/store/user'
import { onShow } from '@dcloudio/uni-app'

const { isLogined } = storeToRefs(useUserStore())
const { RunGetOneMemberDetail, getOpenId, onRegister } = useUserStore()
const phoneNumber = ref('')
// 导入弹窗组件
const toast = useToast()

const isAgree = ref(false)
const registerPopup = ref(null)
// 用户上传头像地址
const avatarURL = ref('')
const nickname = ref('')
const loading = ref(false)

onShow(() => {
  openLoading(login, '登录失败, 请重新登录')
})

// 头像地址
const avatarUrl = computed(() => {
  return avatarURL.value || 'https://imgs.699pic.com/images/500/465/562.jpg!list1x.v2'
})

function login() {
  getOpenId()
}

async function register() {
  await onRegister(phoneNumber.value, nickname.value)
  if (avatarURL.value) {
    // 图像 上传
    const data = await uploadFile<IUploadData>({ tempFilePath: avatarUrl.value, formData: { fileBucketID: FILEBUCKETID } })
    const imageData = data as IUploadData
    imageData && await updateMyMemberAvatar(imageData.filesURL)
    RunGetOneMemberDetail()
  }
}

function getPhoneNumber(detail) {
  const { errMsg, encryptedData, iv } = detail
  if (errMsg === 'getPhoneNumber:ok') {
    uni.login({
      provider: 'weixin',
      success: async ({ code }) => {
        const { data, run } = useRequest(() => getWeixinMemberPhone(encryptedData, iv, code))
        await run()
        phoneNumber.value = data.value.phoneNumber
        if (phoneNumber.value) {
          const { data, run } = useRequest(() => searchMemberByPhone(phoneNumber.value))
          await run()
          if (data.value?.phone && data.value.phone === phoneNumber.value) {
            console.log('openId校验失败或手机号未找到')
            openLoading(login, '登录失败, 请重新登录')
            return
          }
          else {
            console.log('手机号不存在或未注册')
          }
        }
        // 未获取到手机号码
        console.log('未获取到手机号码')
        registerPopup.value = true
      },
    })
  }
}

function openLoading(loginFun: () => void, errMsg) {
  loading.value = true
  loginFun()
  setTimeout(() => {
    loading.value = false
    if (isLogined) {
      uni.navigateBack({ delta: 1 })
    }
    else {
      toast.error(errMsg)
    }
  }, 1200)
}

async function chooseAvatar(detail) {
  avatarURL.value = detail.detail?.avatarUrl
}

function handleChange(e) {
  nickname.value = e.detail.value
}

function handleClose() {
  nickname.value = ''
}

function navToPrivacy() {
  uni.navigateTo({ url: '/pages/mine/privacy/index' })
}

function navToRegister() {
  uni.navigateTo({ url: '/pages/mine/register/index' })
}
</script>

<template>
  <wd-overlay :show="loading">
    <view class="flex items-center justify-center h-full">
      <wd-loading />
    </view>
  </wd-overlay>
  <view class="justify-center items-center flex-col flex">
    <wd-img :width="84" :height="84" :src="avatarUrl" />

    <wd-divider color="#111" style="width: 75%; height: 1px;background: #cccccc80;margin-block: 4vh 2vh;" />

    <text class="font-extrabold text-4 p-2" style="color: #111;">
      智能导寻
    </text>
    <text class="font-extrabold text-4 p-2 p-1 " style="color: #111;">
      申请授权登录
    </text>
    <wd-checkbox v-model="isAgree" shape="square" class="" style="align-items: center; display: inline-flex;">
      <text class="text-[#949494]" style="">
        同意并接受
        <text class="text-[#1e7aff]" style="" @tap.stop="navToPrivacy">
          《隐私协议》
        </text>
        和
        <text class="text-[#1e7aff]" @tap.stop="navToRegister">
          《注册协议》
        </text>
      </text>
    </wd-checkbox>

    <view class="m-2 p-2 gap-2 justify-center items-center flex-col flex">
      <wd-button :disabled="!isAgree" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
        授权登录
      </wd-button>
    </view>
  </view>

  <wd-popup v-model="registerPopup" custom-style="border-radius:32rpx;" @close="handleClose">
    <view class="bg-[#fff] rounded-2 p-6 flex-col flex" style="align-items: center;">
      <button class="p-0 w-16 h-16" open-type="chooseAvatar" @chooseavatar="chooseAvatar">
        <wd-img :width="64" :height="64" :src="avatarUrl" style="" />
      </button>
      <view class="w-60 flex" style="align-items: start; flex-direction: column; ">
        <input v-model="nickname" type="nickname" placeholder="请输入昵称" class="border-b-[1px] border-b-solid border-b-[#dbdbdb] p-2" @change="handleChange">
        <text class="c-pink text-3 p-2">
          *以英文字母或者汉字开头
        </text>
        <text class="c-pink text-3  p-2">
          *限4-16个字符,一个汉字为2个字符
        </text>
      </view>
      <wd-button :disabled="!nickname.length" class="w-5 p-2" @click="openLoading(register, '注册失败, 请重新注册')">
        注册
      </wd-button>
    </view>
  </wd-popup>
</template>
