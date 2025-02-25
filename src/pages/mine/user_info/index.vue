<route lang="json5">
    {
      style: {
        navigationBarTitleText: '个人信息',
      },
    }
</route>

<template>
	<view>
        <!-- 个人信息列表 -->
        <wd-cell-group title="交易管理" border>
            <wd-cell title="头像" @click="onEditAvatar">
                <template #default>
                    <wd-img :width="100" :height="100" round :src="avatarSrc" />
                </template>
            </wd-cell>
            <wd-cell title="昵称" :value="userInfo.shortName" clickable @click="onEditName"/>
            <wd-cell title="手机号" :value="userInfo.phone" clickable />
            <wd-picker :columns="propertyOptions" label="居住小区" v-model="propertyValue" @confirm="onPropertyChange" />
        </wd-cell-group>

        <!-- 修改昵称弹窗 -->
        <wd-popup v-model="showPopup" title="修改昵称" @close="handleClose" closable >
            <view>
                <text>修改昵称</text>
				<input class="input" :value="userInfo.shortName" focus placeholder="请输入昵称" @input="onNicknameInput" />
				<text class="tip">*以英文字母或者汉字开头</text>
				<text class="tip">*限4-16个字符，一个汉字为2个字符</text>
				<button type="primary" size="mini" :disabled="!nickname.length || nickname === userInfo.shortName"
					style="background-color: #1e7aff;border-radius: 4px; margin-top: 3vh;"
					@click="onNameConfirm">提交</button>
            </view>
        </wd-popup>
	</view>
</template>

<script setup>
    import { useUserStore } from '/store/user.ts'
	import { storeToRefs } from 'pinia'
    import {updateMyMemberPropertyID, getPropertyList, 
        updateMyMemberShortname, updateMyMemberAvatar, uploadOneFileToQiniu,} from '/service/static/user.ts'

	const namePopup = ref(null)
	const nickname = ref('')
	const userStore = useUserStore()
	const { userInfo } = storeToRefs(userStore)
	const propertyOptions = ref([])

    // 计算属性，返回图片的路径
	const avatarSrc = computed(() => {
		return userInfo.value.avatarURL || '/static/img/mine/avatar.svg';
	})

	const propertyValue = computed(() => {
		const index = propertyOptions.value?.findIndex(item => item.propertyID === userInfo.value.propertyID)
		return index !== -1 ? index : void 0
	})

    // 点击事件，弹窗，修改昵称
	onLoad(() => {
		getPropertyOptions()
	})

	const onNicknameInput = e => {
		nickname.value = e.target.value
	}

    // 点击事件，修改头像
	const onEditAvatar = () => {
        const { loading, data, run } = useUpload({
            fileBucketID: FILEBUCKETID,
            sessionID: 'b3e1b5e69ee742d1bd4211d3ae5106a8',
        })

	}

	const showPopup = () => {
		namePopup.value = true
	}

    const closePopup = () => {
        // 关闭弹窗
        namePopup.value = false
    }

	const onNameConfirm = async () => {
		const sessionID = uni.getStorageSync('loginInfo').sessionID
		const res = await get('/updateMyMemberShortname', { shortName: nickname.value, sessionID })
		namePopup.value.close()
		mineStore.getUserInfo()
	}

	const getPropertyOptions = async () => {
		const sessionID = uni.getStorageSync('loginInfo').sessionID
		const res = await get('/getPropertyList', { sessionID, applicationID: APPLICATIONID })
		propertyOptions.value = res.rows
	}

	const onPropertyChange = async (e) => {
		const propertyID = propertyOptions.value?.[e.detail.value]?.propertyID
		const sessionID = uni.getStorageSync('loginInfo').sessionID
		const res = await get('/updateMyMemberPropertyID', { propertyID, sessionID })
		mineStore.getUserInfo()
		uni.showToast({ title: '修改成功', icon: 'success' })
	}
</script>