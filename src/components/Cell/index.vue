<script lang="ts" setup>
defineProps<{
  icon?: string
  title?: string
  label?: string
  value?: string
}>()

defineEmits(['click'])
</script>

<template>
  <view
    class="flex justify-between items-center p-4 rounded-4 bg-white"
    hover-class="bg-[rgba(0,0,0,0.06)]!"
    @click="$emit('click')"
  >
    <view class="flex items-center gap-2 text-3.5 text-[rgba(0,0,0,0.85)]">
      <slot name="icon">
        <view v-if="icon" class="text-4" :class="icon" />
      </slot>
      <view>
        <slot name="title">
          <view>{{ title }}</view>
        </slot>
        <slot name="label">
          <view v-if="label" class="text-[rgba(0,0,0,0.45)] text-3">
            {{ label }}
          </view>
        </slot>
      </view>
    </view>
    <view class="flex items-center gap-2">
      <slot name="value">
        <view v-if="value">
          {{ value }}
        </view>
      </slot>
      <slot name="arrow">
        <view class="text-4 i-tabler:chevron-right" />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
</style>
