<route lang="json5">
{
  style: {
    navigationBarTitleText: '开始挪车',
  },
}
</route>

<script setup lang="ts">
import { useUserStore } from '@/store'

const userStore = useUserStore()

const phone = computed(() => userStore.MemberDetail?.phone)
</script>

<template>
  <view class="h-full flex flex-col gap-2">
    <view>
      <view>phone1:{{ phone }}</view>
    </view>

    <view class="flex-1" />

    <wd-button custom-class="w-full mt-auto!" size="large" block>
      开始挪车
    </wd-button>
  </view>
</template>
