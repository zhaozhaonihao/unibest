<route lang="json5">
{
  layout: 'demo',
  style: {
    navigationBarTitleText: '请求',
  },
}
</route>

<template>
  <view class="p-6 text-center">
    <view class="my-2">使用的是 laf 云后台</view>
    <view class="text-green-400">我的推荐码，可以获得佣金</view>

    <!-- #ifdef H5 -->
    <view class="my-2">
      <a class="my-2" :href="recommendUrl" target="_blank">{{ recommendUrl }}</a>
    </view>
    <!-- #endif -->

    <!-- #ifndef H5 -->
    <view class="my-2 text-left text-sm">{{ recommendUrl }}</view>
    <!-- #endif -->

    <!-- http://localhost:9000/#/pages/index/request -->
    <wd-button @click="run" class="my-6">发送请求</wd-button>
    <view class="h-16">
      <view v-if="loading">loading...</view>
      <block v-else>
        <view class="text-xl">请求数据如下</view>
        <view class="text-green leading-8">{{ JSON.stringify(data) }}</view>
      </block>
    </view>
    <wd-button type="error" class="my-6" :disabled="!data">重置数据</wd-button>
    <wd-button @click="changeFocusID" class="my-6">修改FocusID</wd-button>
    <view>{{ focusID }}</view>
  </view>
</template>

<script lang="ts" setup>
import { getFooAPI, postFooAPI, IFooItem } from '@/service/index/foo'
import { findPetsByStatusQueryOptions, useAddPetMutation } from '@/service/app'
import { useQuery } from '@tanstack/vue-query'
import * as apis from '@/service/app/pet'

const recommendUrl = ref('http://laf.run/signup?code=ohaOgIX')

// const initialData = {
//   name: 'initialData',
//   id: '1234',
// }
const focusID = ref('9f482165b37f419ba140507040ebb4b6')

// 添加修改focusID的方法
const changeFocusID = () => {
  focusID.value = 'new-focus-id-' + Math.random().toString(36).substring(7)
  console.log('focusID changed to:', focusID.value)
}

// 适合少部分全局性的接口————多个页面都需要的请求接口，额外编写一个 Service 层
const { loading, error, data, run } = useRequest<IFooItem>(() => getFooAPI('菲鸽'), {
  immediate: false,
})

// 使用 vue-query 的 useQuery 来请求数据，只做参考，是否使用请根据实际情况而定
const {
  data: data2,
  error: error2,
  isLoading: isLoading2,
  refetch,
} = useQuery(findPetsByStatusQueryOptions(computed(() => ({ focusID: focusID.value }))))

// const { mutate, isPending } = useAddPetMutation({
//   onSuccess: (data) => {
//     console.log('success data: ', data)
//   },
// })

// mutate({
//   body: {
//     name: 'doggie',
//     photoUrls: [],
//   },
//   options: {
//     url: 'https://petstore.swagger.io/v2/pet',
//     header: {
//       asd: 132,
//     },
//   },
// })
</script>
