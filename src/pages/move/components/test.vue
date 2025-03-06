<script setup>
import { ref } from 'vue'

const panoramaList = ref([]) // 模拟没有全景照片
const parkIndex = ref(null)
const parkOptions = ref([
  { name: '区域 A', value: 0 },
  { name: '区域 B', value: 1 },
  { name: '区域 C', value: 2 },
])

function onLongPress(index) {
  console.log('长按图片', index)
}

function onParkChange(index) {
  parkIndex.value = index
}

function onPhoto() {
  console.log('拍摄全景照片')
}

function onNext() {
  console.log('下一步')
}
</script>

<template>
  <view class="p-4">
    <view v-if="panoramaList.length" class="flex flex-col items-center">
      <image
        v-for="(item, index) in panoramaList"
        :key="index"
        :src="item"
        class="w-full mb-2"
        mode="widthFix"
        @longpress="onLongPress(index)"
      />
    </view>
    <view v-else class="flex flex-col items-center text-gray-500 text-center">
      <image src="/static/img/move/ruler.svg" mode="" class="w-12 h-12 mb-2" />
      <text class="text-base">
        请在10米左右
      </text>
      <text class="text-base">
        拍摄当前停车区域的全景照片
      </text>
      <text class="text-base">
        可显示乱停的情况
      </text>
    </view>

    <wd-picker :value="parkIndex" :options="parkOptions" @change="onParkChange">
      <view class="flex items-center justify-between bg-white rounded-lg p-3 mt-4">
        <text class="text-lg font-bold">
          挪车区域
        </text>
        <text>{{ parkOptions[parkIndex]?.name || "请选择" }}</text>
        <wd-icon name="tabler-chevron-right" class="text-xl text-gray-400" />
      </view>
    </wd-picker>

    <view class="flex justify-between mt-5">
      <wd-button type="primary" @click="onPhoto">
        拍摄全景照片
      </wd-button>
      <wd-button
        type="outline"
        :disabled="parkIndex === null || !panoramaList.length"
        @click="onNext"
      >
        下一步
      </wd-button>
    </view>
  </view>
</template>
