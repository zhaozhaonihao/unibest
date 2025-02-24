<route lang="json5">
{
  style: {
    navigationBarTitleText: '测试页面',
  },
}
</route>
<template>
  <view>test.vue</view>
  <wd-button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">授权登录</wd-button>
</template>

<script setup lang="ts">
import { getOneMemberDetail } from '@/service/static/login'

const { data: PictureList } = useRequest(() => getOneMemberDetail(), { immediate: true })
console.log(PictureList)

const getPhoneNumber = ({ detail }) => {
  console.log('登录', detail)

  const { errMsg, encryptedData, iv } = detail
  if (errMsg === 'getPhoneNumber:ok') {
    // uni.login({
    //   provider: 'weixin',
    //   success: async ({ code }) => {
    //     const res = await get('/getWeixinMemberPhone.json', {
    //       appID: APPID,
    //       encryptedData,
    //       iv,
    //       js_code: code,
    //     })
    //     phone.value = res.phoneNumber
    //     if (res.phoneNumber) searchMember(res.phoneNumber)
    //   },
    // })
  }
}
</script>
