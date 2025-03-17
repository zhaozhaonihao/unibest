<script lang="ts" setup>
import Cell from '@/components/Cell/index.vue'
</script>

<template>
  <view>
    <Cell
      class="bg-white"
      icon="i-tabler:user"
      title="用户名"
      label="用户昵称"
      value="张三"
    />
    <Cell class="bg-white">
      <template #icon>
        <view class="i-tabler:user-circle text-4xl text-blue-500" />
      </template>
      <template #title>
        <view class="text-lg font-bold">
          自定义标题
        </view>
      </template>
      <template #label>
        <view class="text-sm text-gray-500">
          自定义描述内容
        </view>
      </template>
      <template #value>
        <view class="text-sm text-green-500">
          自定义值
        </view>
      </template>
      <template #arrow>
        <view class="i-tabler:chevron-right text-gray-400" />
      </template>
    </Cell>
  </view>
</template>

<style lang="scss" scoped>

</style>
