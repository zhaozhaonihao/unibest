<route lang="json5">
{
  style: {
    navigationBarTitleText: '个人中心',
  },
}
</route>
<template>
  <view class="flex flex-col gap-3">
    <view class="flex items-center gap-4">
      <wd-img
        :width="100"
        :height="100"
        round
        src="https://img11.360buyimg.com/imagetools/jfs/t1/143248/37/5695/265818/5f3a8546E98d998a4/745897ca9c9e474b.jpg"
      />
      <view>
        <view class="mt-2 text-xl font-bold">柯</view>
        <view class="text-gray-500">19521491949</view>
      </view>
    </view>

    <Divider />

    <view class="grid grid-cols-4 gap-2">
      <view
        v-for="item in shortcuts"
        :key="item.label"
        class="flex flex-col items-center p-2 bg-white rounded"
      >
        <view class="text-5" :class="item.icon"></view>
        <view class="text-3">{{ item.label }}</view>
      </view>
    </view>
    <Divider />
    
    <view>
      <wd-cell-group class="" >
        <wd-cell :title="item.label" 
          :border="true" v-for="item in settings" :key="item.label" is-link to="" center>
          <template #icon>
            <view :class="item.icon" ></view>
          </template>
        </wd-cell>
      </wd-cell-group>
    </view>
  </view>
</template>

<script setup lang="ts">
import Divider from '@/components/Divider/index.vue'

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
</script>
