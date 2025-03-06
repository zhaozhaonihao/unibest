<script lang="ts" setup>
defineProps<{
  icon?: string
  title: string
  label?: string
  value?: string
}>()
const emits = defineEmits(['click'])
function onClick() {
  console.log('onClick')
  emits('click')
}
</script>

<template>
  <view
    class="flex justify-between items-center p-4 rounded-4"
    hover-class="bg-[rgba(0,0,0,0.06)]!"
    @click="onClick"
  >
    <view class="flex items-center gap-2 text-3.5 text-[rgba(0,0,0,0.85)]">
      <view class="text-4" :class="icon" />
      <view>
        <view>
          {{ title }}
        </view>
        <view class="text-[rgba(0,0,0,0.45)] text-3">
          {{ label }}
        </view>
      </view>
    </view>
    <view class="flex items-center gap-2">
      <view>{{ value }}</view>
      <view class="text-4 i-tabler:chevron-right" />
    </view>
  </view>
</template>

<style lang="scss" scoped>

</style>
