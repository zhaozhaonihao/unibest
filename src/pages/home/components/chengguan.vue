<script setup lang="ts">
import Divider from '@/components/Divider/index.vue'

const _list = ref([])

// const noticeArticleList = computed(() => NoticeArticleList.value?.rows.map((i) => i.title))

const parkIndex = ref()
async function _onParkChange(e) {
  parkIndex.value = e.detail.value
}

function onClick() {
  uni.navigateTo({ url: '/pages/inspection/index' })
  // uni.showActionSheet({})
}

function onMove() {
  uni.navigateTo({ url: '/pages/move/index' })
}
</script>

<template>
  <view class="flex flex-col gap-2 p-4 bg-white">
    <view class="flex justify-between">
      <view class="text-4 font-bold">
        我推荐的停车点位
      </view>
      <view>
        <wd-button size="small" plain>
          周边停车点位
        </wd-button>
      </view>
    </view>

    <Divider />

    <view>内容</view>

    <wd-button plain @click="onClick">
      巡视
    </wd-button>
    <wd-button plain @click="onMove">
      挪车
    </wd-button>

    <!-- <picker @change="onParkChange" range-key="name" :value="parkIndex" :range="parkOptions">
      <view class="select-wrap">
        <text class="select-title">挪车区域</text>
        <text>{{ '请选择' }}</text>
        <view class="i-table:icon"></view>
      </view>
    </picker> -->
  </view>
</template>

<style scoped lang="scss"></style>
