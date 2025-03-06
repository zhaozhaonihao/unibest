<script lang="ts" setup>
const emit = defineEmits(['search', 'scan', 'message'])
</script>

<template>
  <view class="flex gap-4 items-center h-9 px-3 bg-white rounded">
    <view class="flex flex-1" @click="emit('search')">
      <view class="text-5 i-tabler:search" />
      <view class="flex-1" />
    </view>

    <view class="w-px h-4.5 bg-gray-400" />

    <view class="flex" @click.stop="emit('scan')">
      <view class="text-5 i-tabler:scan" />
    </view>

    <view class="flex" @click.stop="emit('message')">
      <view class="text-5 i-tabler:bell" />
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
