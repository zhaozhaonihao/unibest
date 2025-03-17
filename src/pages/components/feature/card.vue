<script setup lang="ts">
defineProps<{
  sequenceCode?: string
  name?: string
  faceImage?: string
  sizeType?: string | number
  color?: string
  brandName?: string
}>()

const hasError = ref(false)
</script>

<template>
  <view class="p-4 bg-white rounded-4 shadow-md">
    <view>
      <view class="flex justify-between items-center font-black">
        <text class="text-blue-5">
          {{ sequenceCode }}
        </text>
        <text class="text-black">
          {{ name }}
        </text>
      </view>
      <text class="text-2.5 text-gray text-right">
        车辆信息
      </text>
    </view>

    <view class="w-full h-[0.5px] my-2 bg-blueGray" />

    <view class="flex gap-4">
      <view class="flex flex-col justify-center">
        <view class="size-20 bg-gray-1 flex justify-center items-center rounded-lg shrink-0">
          <wd-img
            v-if="faceImage && !hasError"
            custom-class="w-full h-full"
            :src="faceImage"
            mode="aspectFill"
            enable-preview
            @error="hasError = true"
          />
          <view v-else class="text-4xl text-gray-400 i-tabler:photo" />
        </view>
      </view>

      <view class="flex-1 flex flex-wrap items-center gap-3">
        <view class="flex flex-col items-center gap-1">
          <text class="text-2.8 text-gray-5">
            品牌
          </text>
          <text class="text-black">
            {{ brandName }}
          </text>
        </view>
        <view class="flex flex-col items-center gap-1">
          <text class="text-2.8 text-gray-5">
            车型
          </text>
          <text class="text-black">
            {{ sizeType }}
          </text>
        </view>
        <view class="flex flex-col items-center gap-1">
          <text class="text-2.8 text-gray-5">
            颜色
          </text>
          <text class="text-black">
            {{ color }}
          </text>
        </view>
      </view>
    </view>

    <view class="w-full h-[0.5px] my-2 bg-blueGray" />

    <view>
      <text class="text-2.5 text-gray text-right">
        违停信息
      </text>
      <view class="flex justify-between items-center font-medium text-black">
        <text class="">
          地铁站1号位
        </text>
        <text class="">
          2024-12-23 10:09
        </text>
      </view>
    </view>
  </view>
</template>

<style scoped lang="scss">

</style>
