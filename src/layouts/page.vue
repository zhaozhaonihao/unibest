<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {}

onPullDownRefresh(() => {
  console.log('refresh start')
  setTimeout(() => {
    uni.stopPullDownRefresh()
    console.log('refresh end')
  }, 1000)
})
</script>

<template>
  <wd-config-provider :theme-vars="themeVars" custom-class="h-full">
    <view class="flex flex-col h-full overflow-y-auto bg-[#f5f5f5]">
      <slot />

      <wd-gap safe-area-bottom height="0" />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<style lang="scss"></style>
