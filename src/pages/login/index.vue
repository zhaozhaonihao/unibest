<template>
  <view class="content">
    <img class="logo" src="/static/img/mine/avatar.svg" alt="logo" />
    <view class="divider" />
    <text class="title">智能导寻</text>
    <text class="title">申请授权登录</text>
    <checkbox-group @change="checkChange">
      <checkbox value="agree" style="display: f lex;transfor m:scale(0.65)">
        <view class="check-wrap">
          同意并接受
          <view class="btn" @tap.stop="navToPrivacy">《隐私协议》</view>
          和
          <view class="btn" @tap.stop="navToRegister">《注册协议》</view>
        </view>
      </checkbox>
    </checkbox-group>

    <button
      type="primary"
      size="mini"
      :disabled="!isAgree"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
      style=" margin-top: 4vh;backgroun d-color: #1e7aff;border-radius: 4px"
    >
      授权登录
    </button>
    <button
      type="primary"
      size="mini"
      plain="true"
      style="margin-top: 2vh ;color: #1e7aff;border -color: #1e7aff"
    >
      返回主页
    </button>

    <uni-popup ref="registerPopup" :is-mask-click="false" mask-background-color="#f1f9ff">
      <view class="popup-content">
        <img class="logo" src="/static/img/mine/avatar.svg" alt="logo" />
        <input class="input" focus placeholder="请输入昵称" @input="onNicknameInput" />
        <text class="tip">*以英文字母或者汉字开头</text>
        <text class="tip">*限4-16个字符，一个汉字为2个字符</text>
        <button
          type="primary"
          size="mini"
          :disabled="!nickname.length"
          style=" margin-top: 3vh;backgroun d-color: #1e7aff;border-radius: 4px"
          @click="onRegister"
        >
          注册
        </button>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { getWeixinMemberPhone } from '@/service/static/login'

import dayjs from 'dayjs'

const isAgree = ref(false)
const registerPopup = ref(null)
const phone = ref()
const nickname = ref('')
const openID = uni.getStorageSync('openID')

// const mineStore = useMineStore()

onLoad(() => {})

const onNicknameInput = (e) => {
  nickname.value = e.target.value
}

const checkChange = ({ detail }) => {
  isAgree.value = !!detail?.value?.length
}

/**
 * 获取手机号
 */
const getPhoneNumber = ({ detail }) => {
  const { errMsg, encryptedData, iv } = detail
  if (errMsg === 'getPhoneNumber:ok') {
    uni.login({
      provider: 'weixin',
      success: async ({ code }) => {
        const { data: res } = useRequest(() => getWeixinMemberPhone(encryptedData, iv, code), {
          immediate: true,
        })

        phone.value = res.phoneNumber
        if (res.phoneNumber) searchMember(res.phoneNumber)
      },
    })
  }
}

/**
 * 通过手机号查询是否存在用户
 */
const searchMember = async (phone) => {
  try {
    const res = await get('/searchMemberByPhone.json', { applicationID: APPLICATIONID, phone })
    console.log(res)
    onLogin()
  } catch (error) {
    const { header } = error
    if ((header.code = 10011)) {
      registerPopup.value.open('center')
    }
  }
}

/**
 * 注册
 */
const onRegister = async () => {
  uni.showLoading({ title: '注册中' })
  const params = {
    deviceID: DEVICEID,
    siteID: SITEID,
    phone: phone.value,
    loginName: phone.value,
    name: nickname.value,
    shortName: nickname.value,
    verifyCode: '999999',
    password: '111111',
    openID,
  }

  try {
    const res = await get('/memberPhoneRegister.json', params)
    uni.showToast({ title: '注册成功', icon: 'success' })
    uni.setStorageSync('loginInfo', { ...res, time: dayjs() })
    registerPopup.value.close()
    mineStore.getUserInfo()
    uni.navigateBack({ delta: 1 })
  } catch (error) {
    uni.showToast({ title: '注册失败', icon: 'error' })
  }
}

const onLogin = async () => {
  uni.showLoading({ title: '登录中' })
  const res = await get('/openIDorUnionIDFastLogin.json', {
    deviceID: DEVICEID,
    siteID: SITEID,
    openID,
  })
  uni.hideLoading()
  uni.setStorageSync('loginInfo', { ...res, time: dayjs() })
  uni.navigateBack({ delta: 1 })
}

const navToPrivacy = () => {
  uni.navigateTo({ url: '/pages/mine/privacy/index' })
}

const navToRegister = () => {
  uni.navigateTo({ url: '/pages/mine/register/index' })
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-block-start: 5vh;

  .logo {
    width: 84px;
    height: 84px;
  }

  .divider {
    width: 75%;
    height: 1px;
    margin-block: 4vh 2vh;
    background: #cccccc80;
  }

  .title {
    margin-bottom: 8px;
    font-size: 20px;
    font-weight: 600;
    color: #111;

    &:last-child {
      margin-bottom: 17px;
    }
  }

  .check-wrap {
    display: inline-flex;
    align-items: center;
    font-size: 20px;
    color: #949494;
    white-space: nowrap;

    .btn {
      color: #1e7aff;
    }
  }

  .popup-content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70vw;
    padding: 25px;
    margin-bottom: 10vh;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 12px 0px #00000033;
    transform: translate(-50%, -100%);

    .logo {
      width: 64px;
      height: 64px;
    }

    .input {
      width: calc(100% - 30px);
      height: 38px;
      padding-inline: 12px;
      margin-block: 24px 12px;
      font-size: 13px;
      background: #eee;
      border-radius: 6px;
    }

    .tip {
      align-self: flex-start;
      font-size: 12px;
      color: #ff3131;
    }
  }
}
</style>
