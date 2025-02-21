<route lang="json5">
{
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
}
</route>

<template>
  <view style="display: flex; flex-direction: column; gap: 12px; padding: 12px">
    <view>1</view>
    <view>2</view>
    <view>3</view>
    <view>4</view>
  </view>
</template>

<script lang="ts" setup>
import { findPetsByStatusQueryOptions, useAddPetMutation } from '@/service/app'
import { getFocusPictureList } from '@/service/static/index'

const focusID = ref('9f482165b37f419ba140507040ebb4b6')

// const { loading, error, data, run } = useRequest(() => getFocusPictureList(FOCUSID), {
//   immediate: true,
// })

// console.log(data)

// 使用 vue-query 的 useQuery 来请求数据，只做参考，是否使用请根据实际情况而定
// const {
//   data: data2,
//   error: error2,
//   isLoading: isLoading2,
//   refetch,
// } = useQuery(findPetsByStatusQueryOptions(computed(() => ({ focusID: FOCUSID }))))

const onSearch = () => {
  uni.navigateTo({ url: '/pages/home/search/index' })
  console.log('onSearch')
}
const onScan = () => {
  // uni.navigateTo({ url: "/pages/home/search/index" })
  console.log('onScan')
}
const onMessage = () => {
  // uni.navigateTo({ url: "/pages/home/search/index" })
  console.log('onMessage')
}
</script>

<style lang="scss" scoped></style>
