<script lang="ts" setup>
defineProps<{
  options: {
    label: string
    value: string | undefined
  }[]
}>()
</script>

<template>
  <view class="flex flex-col gap-2 p-4">
    <template v-for="{ label, value } in options" :key="label">
      <view v-if="label && value" class="flex justify-between items-center text-4">
        <text class="font-bold">
          {{ label }}
        </text>
        <text>
          {{ value }}
        </text>
      </view>
    </template>
  </view>
</template>
