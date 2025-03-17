<script setup lang="ts">
const { id, title, src, desc, time } = defineProps<{
  id: string
  title?: string
  src?: string
  desc?: string
  time?: string
}>()

const emits = defineEmits(['click'])

const hasError = ref(false)
</script>

<template>
  <view class="flex items-center gap-4 p-4 h-[100px]" @click="emits('click', id)">
    <slot name="image">
      <view class="w-[80px] h-[80px] bg-gray-1 flex items-center justify-center rounded-2">
        <wd-img
          v-if="src && !hasError"
          :src="src"
          :width="80"
          mode="widthFix"
          @error="hasError = true"
        />
        <view v-else class="i-tabler:photo text-5xl text-gray-5" />
      </view>
    </slot>

    <view class="flex-1 flex flex-col justify-between h-full overflow-hidden">
      <slot name="title">
        <view class="text-4 font-bold truncate">
          {{ title }}
        </view>
      </slot>

      <slot name="desc">
        <view class="text-3 text-[#666] line-clamp-2">
          {{ desc }}
        </view>
      </slot>

      <slot name="time">
        <view class="text-3 text-right text-[#999]">
          {{ time }}
        </view>
      </slot>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
