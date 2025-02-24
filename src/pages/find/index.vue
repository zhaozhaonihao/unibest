<route lang="json5" type="find">
    {
      layout: 'default',
      style: {
        navigationBarTitleText: '搜索',
      },
    }
</route>

<template>
	<view class="content">
		<view class="v-item-wrap" v-if="vList.length">
			<VehicleItem v-for="item in vList" :key="item.vehicleID" :item="item" />
		</view>
		<view class="empty-wrap" v-else>
			<text>您还没有绑定车辆信息,</text>
			<text>绑定车辆可以快速获取车辆动态信息</text>
			<view class="text-btn" @click="onBind">立即绑定</view>
		</view>
		<text class="title">车牌号查车</text>
		<input class="uni-input" v-model="sequenceCode" focus placeholder="请填写车牌号，支持模糊查询" />
		<view class="primary-btn" :class="{ 'disabled': !sequenceCode }" @click="onSearch">查询</view>
		<view class="divider" />
		<view class="outline-btn" @click="onFeature">特征查车</view>
	</view>
    
	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="info" cancelText="关闭" confirmText="特征查车" title="提示"
			:content="`未查询到车牌号${sequenceCode}的动态信息`" @confirm="onFeature" @close="dialogClose"></uni-popup-dialog>
	</uni-popup>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getVehicleList } from '@/service/static/index'
	import VehicleItem from './components/vehicle_item.vue'
	import { APPLICATIONID } from '/static/constant.ts'
	// import { useUserStore } from '/store/user.ts'
	import { useUserStore } from '@/store/user'
	import { storeToRefs } from 'pinia'
    import { useMessage } from '@/uni_modules/wot-design-uni'

    const message = useMessage()
	const sequenceCode = ref('')
	const vList = ref([])
	const alertDialog = ref(null)

	const userStore = useUserStore()
	const { userInfo, loginInfo } = storeToRefs(userStore)

	onLoad(() => {
		getList()
	})

	const onBind = () => {
		uni.navigateTo({ url: '/pages/vehicle/add' })
	}

	const getList = async () => {
		const res = await get('/getVehicleList.json', {
			applicationID: APPLICATIONID,
			memberID: loginInfo.value.memberID
		})
		vList.value = res.rows
	}

	const onSearch = async () => {
		const sessionID = uni.getStorageSync('loginInfo').sessionID
		const res = await get('/getVehicleList.json', { sessionID, sequenceCode: sequenceCode.value })
		if (!res.rows.length) {
            // 弹窗
            message.alert({
                
            })
			alertDialog.value.open()
		}
	}


	const onFeature = () => {
		uni.navigateTo({ url: '/pages/find/feature' })
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		// padding-inline: 16px;
		height: 100vh;
		box-sizing: border-box;

		.v-item-wrap {
			flex: 1;
			width: 100%;
			padding-block-start: 16px;
			padding-inline: 16px;
			box-sizing: border-box;
			overflow-y: auto;
		}

		.empty-wrap {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			text {
				color: #989696;
			}

			.text-btn {
				color: #1e7aff;
				margin-top: 12px;
			}
		}

		.title {
			color: #333;
			font-weight: 13px;
			width: 76%;
			text-align: left;
			margin-bottom: 12px;
		}

		.uni-input {
			background-color: #eee;
			border-radius: 6px;
			padding-inline: 16px;
			width: 76%;
			height: 44px;
			line-height: 44px;
			box-sizing: border-box;
		}

		.primary-btn {
			color: #fff;
			background-color: #1e7aff;
			border-radius: 6px;
			width: 76%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			margin-top: 20px;

			&:hover {
				color: #fff;
				background-color: #1e7aff;
			}

			&.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}

		.divider {
			width: 100%;
			height: 1px;
			background-color: #97979766;
			margin-block: 12px;
		}

		.outline-btn {
			color: #1e7aff;
			border: 1px solid #1e7aff;
			background-color: transparent;
			border-radius: 6px;
			width: 76%;
			height: 44px;
			line-height: 42px;
			text-align: center;
			margin-bottom: 24px;

			&:hover {
				color: #0062cc;
				border-color: #0062cc;
			}

			&.disabled {
				opacity: 0.5;
				pointer-events: none;
			}
		}
	}
</style>