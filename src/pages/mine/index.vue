<route lang="json5">
  {
    style: {
      navigationBarTitleText: '个人中心',
    },
  }
  </route>

<script setup lang="ts">
import Divider from '@/components/Divider/index.vue'
import { useUserStore } from '@/store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { OneMemberDetail: userInfo, isLogined } = storeToRefs(userStore)
const imgUrl = computed(() => {
  return userInfo.value.avatarURL || 'https://imgs.699pic.com/images/500/465/562.jpg!list1x.v2'
})

const shortcuts = ref([
  { label: '邀请好友', icon: 'i-tabler:user-plus' },
  { label: '实名认证', icon: 'i-tabler:id-badge' },
  { label: '每日签到', icon: 'i-tabler:calendar-check' },
  { label: '我的积分', icon: 'i-tabler:coins' },
  { label: '钱包', icon: 'i-tabler:wallet' },
  { label: '意见反馈', icon: 'i-tabler:mail-opened' },
])

const settings = ref([
  { label: '隐私协议', icon: 'i-tabler:shield-lock' },
  { label: '注册协议', icon: 'i-tabler:file-text' },
  { label: '操作手册', icon: 'i-tabler:book' },
  { label: '常见问题', icon: 'i-tabler:help-circle' },
  { label: '关于我们', icon: 'i-tabler:info-circle' },
])

// 跳转用户信息
function onUserInfo() {
  uni.navigateTo({ url: '/pages/mine/user_info/index' })
}

// 用户登录
function onLogin() {
  uni.navigateTo({ url: '/pages/login/login_apply/index' })
}
</script>

<template>
  <view class="flex flex-col gap-3">
    <view v-if="isLogined" class="flex items-center gap-4" @click="onUserInfo">
      <wd-img :width="100" :height="100" round :src="imgUrl" />
      <view>
        <view class="mt-2 text-xl font-bold">
          {{ userInfo.shortName }}
        </view>
        <view class="text-gray-500">
          {{ userInfo.phone }}
        </view>
      </view>
    </view>

    <view v-else class="header-unlogin">
      <img class="avatar" src="/static/img/mine/avatar.svg" alt="">
      <view class="unlogin">
        未登录
      </view>
      <wd-button @click="onLogin">
        授权登录
      </wd-button>
    </view>

    <Divider />

    <view class="grid grid-cols-4 gap-2">
      <view v-for="item in shortcuts" :key="item.label" class="flex flex-col items-center p-2 bg-white rounded">
        <view class="text-5" :class="item.icon" />
        <view class="text-3">
          {{ item.label }}
        </view>
      </view>
    </view>
    <Divider />

    <view>
      <wd-cell-group class="">
        <wd-cell v-for="item in settings" :key="item.label" :title="item.label" :border="true" is-link to="" center>
          <template #icon>
            <view :class="item.icon" />
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>
