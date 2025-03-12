<route lang="json5">
{
  layout: 'page',
  style: {
    navigationBarTitleText: '个人信息',
  },
}
</route>

<script setup lang="ts">
import { useCropper } from '@/hooks/useUpload'
import { getPropertyList } from '@/service/static'
import { updateMyMemberAvatar, updateMyMemberPropertyID, updateMyMemberShortname } from '@/service/static/user'

const { OneMemberDetail: userInfo, avatarURL } = storeToRefs(useUserStore())
const { RunGetOneMemberDetail } = useUserStore()

onLoad(() => RunGetPropertyList())

// 头像
// 头像裁剪
const { data, run, cropperShow, cropperImgUrl } = useCropper({ fileBucketID: FILEBUCKETID })

async function chooseAvatar() {
  await run()
  data.value && await updateMyMemberAvatar(data.value.filesURL)
  await RunGetOneMemberDetail()
}

function handleConfirm(event) {
  const { tempFilePath } = event
  cropperImgUrl.value = tempFilePath
}

function handleCancel() {
  cropperImgUrl.value = ''
}

// 昵称
// 点击事件，弹窗，修改昵称
const nickname = ref(userInfo.value.shortName)
const namePopup = ref(false)
const convertName = computed(() => nickname.value.length && nickname.value !== userInfo.value.shortName)
async function onNameConfirm() {
  const { run } = useRequest(() => updateMyMemberShortname(nickname.value))
  await run()
  RunGetOneMemberDetail()
  namePopup.value = false
}

// 小区列表
const { data: PropertyList, run: RunGetPropertyList } = useRequest(() => getPropertyList())
const handleProperty = ref<string>(useUserStore().OneMemberDetail.propertyID)
const propertyList = computed(() => {
  return PropertyList.value?.rows?.map((i) => {
    return {
      id: i.propertyID,
      name: i.name,

      label: i.name,
      value: i.propertyID,
    }
  })
})
const { run: RunUpdateMyMemberPropertyID } = useRequest(() => updateMyMemberPropertyID(handleProperty.value))
async function onPropertyChange() {
  await RunUpdateMyMemberPropertyID()
  RunGetOneMemberDetail()
}
</script>

<template>
  <wd-img-cropper
    v-model="cropperShow"
    :img-src="cropperImgUrl"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
  <wd-cell-group border>
    <wd-cell title="头像" is-link :center="true" @click="chooseAvatar">
      <template #default>
        <wd-img round :src="avatarURL" :width="50" :height="50" />
      </template>
    </wd-cell>
    <wd-cell title="昵称" :value="userInfo.shortName" is-link @click="namePopup = true" />
    <wd-cell title="手机号" :value="userInfo.phone" clickable />
    <wd-picker v-model="handleProperty" :columns="propertyList" label="我居住的小区" align-right @confirm="onPropertyChange" />
  </wd-cell-group>

  <!-- 修改昵称弹窗 -->
  <wd-popup v-model="namePopup" custom-class="rounded-4 w-80%">
    <view class="flex flex-col gap-4 p-4">
      <text class="text-3.5 text-center">
        修改昵称
      </text>
      <wd-input v-model="nickname" custom-class="w-full" class="rounded-[6px] bg-[#eee] " focus placeholder="请输入昵称" />
      <wd-text text="*以英文字母或者汉字开头" color="#f472b6" />
      <wd-text text=" *限4-16个字符，一个汉字为2个字符" color="#f472b6" />
      <wd-button class="top-2" :disabled="!convertName" @click="onNameConfirm">
        提交
      </wd-button>
    </view>
  </wd-popup>
</template>

<style lang="scss" scoped>

</style>
