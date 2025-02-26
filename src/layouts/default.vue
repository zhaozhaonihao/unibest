<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {}

// const { safeAreaInsets, windowHeight } = uni.getSystemInfoSync()

// const pageStyle = computed(() => {
//   return {
//     'padding': '1rem',
//     'background-color': '#f5f5f5',
//     // minHeight: windowHeight + 'px',
//     // minHeight: `calc(${windowHeight}px - 2rem)`,
//     'height': `calc(100% - 2rem)`,
//   }
// })

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
    <view class="p-4 bg-[#f5f5f5] h-[calc(100%-2rem)]">
      <slot />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<style lang="scss"></style>
