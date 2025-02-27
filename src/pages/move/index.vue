<route lang="json5">
{
  style: {
    navigationBarTitleText: '挪车',
  },
}
</route>

<script setup lang="ts">
const tab = ref<number>(0)
const tabOptions = computed(() => [
  { title: '今日', key: 'day' },
  { title: '本周', key: 'week' },
  { title: '本月', key: 'month' },
])
function handleChange(event: any) {
  console.log('change', event)
}

function onMove() {
  uni.navigateTo({ url: '/pages/move/add' })
}

// const { data, run } = useRequest(() => openIDorUnionIDFastLogin(openID.value))
// const { data, run } = useRequest(() => getMyMemberMajorList())
// const { data, run } = useRequest(() => getMyCompanyAndEmployeeList())
// const { data, run } = useRequest(() => getOneMemberDetail())
// const { data, run } = useRequest(() => bandingEmployeeWithPhone(singleMemberDetail.value?.phone))
</script>

<template>
  <view class="h-full flex flex-col gap-2">
    <wd-tabs v-model="tab" class="flex-1" @change="handleChange">
      <template v-for="item in tabOptions" :key="item.key">
        <wd-tab :title="item.title">
          <view class="content">
            内容{{ item.key }}
          </view>
        </wd-tab>
      </template>
    </wd-tabs>

    <view class="flex-1" />

    <wd-button custom-class="w-full mt-auto!" size="large" block @click="onMove">
      开始挪车
    </wd-button>
  </view>
</template>
