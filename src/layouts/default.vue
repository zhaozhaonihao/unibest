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
    <view class="h-full overflow-y-auto bg-[#f5f5f5]">
      <slot />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<style lang="scss"></style>
