<route lang="json5">
{
  layout: 'tabbar',
  style: {
    navigationBarTitleText: '我的',
    navigationBarBackgroundColor: '#f1f9ff',
  },
}
</route>

<script setup lang="ts">
import Cell from '@/components/Cell/index.vue'
import Divider from '@/components/Divider/index.vue'

const {
  isLogined,
  OneMemberDetail: userInfo,
  avatarURL,
} = storeToRefs(useUserStore())

const shortcuts = ref([
  { label: '邀请好友', icon: 'i-tabler:user-plus' },
  { label: '实名认证', icon: 'i-tabler:id' },
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
  uni.navigateTo({ url: '/pages/mine/info' })
}

// 用户登录
function onLogin() {
  uni.navigateTo({ url: '/pages/login/login_apply/index' })
}
</script>

<template>
  <view class="flex-1 overflow-y-auto flex flex-col gap-4 bg-[#f1f9ff]">
    <view class="flex gap-4 items-center p-4">
      <template v-if="isLogined">
        <wd-img :width="80" :height="80" round :src="avatarURL" />
        <view class="flex flex-col gap-2" @click="onUserInfo">
          <view class="text-xl font-bold">
            {{ userInfo.shortName }}
          </view>
          <view class="text-gray-500">
            {{ userInfo.phone }}
          </view>
        </view>
      </template>
      <template v-else>
        <view class="w-[80px] h-[80px] flex justify-center items-center bg-[#1e7aff] rounded-50">
          <view class="w-[80%] h-[80%] i-tabler:user-filled bg-white" />
        </view>
        <view class="text-xl font-bold">
          未登录
        </view>
        <wd-button custom-class="ml-auto! rounded!" @click="onLogin">
          授权登录
        </wd-button>
      </template>
    </view>

    <Divider />

    <view class="grid grid-cols-4 gap-2">
      <view v-for="item in shortcuts" :key="item.label" class="flex flex-col justify-center items-center gap-2 p-2 rounded" hover-class="bg-[rgba(0,0,0,0.06)]!">
        <view class="text-5 c-[#1e7aff]" :class="item.icon" />
        <view class="text-3">
          {{ item.label }}
        </view>
      </view>
    </view>

    <Divider />

    <view>
      <template v-for="item in settings" :key="item.label">
        <Cell class="rounded-0!" :icon="item.icon" :title="item.label" />
        <Divider v-if="item.label !== '关于我们'" />
      </template>
    </view>
  </view>
</template>
