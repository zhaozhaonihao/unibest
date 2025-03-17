<template>
	<view>
		<image :src="url" v-if="url" mode="widthFix"></image>
		<l-clipper v-if="show" @success="url = $event.url; show = false" @cancel="show = false"  />
		<button @tap="show = true">裁剪</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageUrl: 'https://img12.360buyimg.com/pop/s1180x940_jfs/t1/97205/26/1142/87801/5dbac55aEf795d962/48a4d7a63ff80b8b.jpg',
				url: '',
				show: false
			}
		}
	}
</script>

<style>
</style>
