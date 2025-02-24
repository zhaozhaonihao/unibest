<template>
  <wd-config-provider :themeVars="themeVars">
    <view :style="pageStyle">
      <slot />
    </view>
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  // colorTheme: 'red',
  // buttonPrimaryBgColor: '#07c160',
  // buttonPrimaryColor: '#07c160',
}

const { safeAreaInsets, windowHeight } = uni.getSystemInfoSync()

const pageStyle = computed(() => {
  return {
    padding: '1rem',
    'background-color': '#f5f5f5',
    // minHeight: windowHeight + 'px',
    minHeight: `calc(${windowHeight}px - 2rem)`,
  }
})

onPullDownRefresh(() => {
  console.log('refresh start')
  setTimeout(function () {
    uni.stopPullDownRefresh()
    console.log('refresh end')
  }, 1000)
})
</script>

<style lang="scss"></style>
