<template>
	<view class="info">
        <!-- 图片 -->
		<wd-img :width="100" :height="100" :src="img" />
        <!-- 标题 -->
        <view class="title">{{ title }}</view>
        <!-- 文本 -->
        <rich-text class="desc" :nodes="rich_text"></rich-text>
	</view>
</template>

<script setup lang="ts">
	import { ref, computed } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'

    const {img, title, rich_text} = defineProps<{
        img: any,
        title: string,
        rich_text: string 
    }>()

</script>
