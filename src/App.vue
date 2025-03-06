<script setup lang="ts">
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

onLaunch(async () => {
  console.log('App Launch')

  const userStore = useUserStore()
  userStore.getOpenId()

  if (userStore.isLoginExpired) {
    await userStore.onLogin()
  }
})

onShow(() => {
  console.log('App Show')
})

onHide(() => {
  console.log('App Hide')
})
</script>

<style lang="scss">
/* #ifdef MP-WEIXIN */
page {
  height: 100%;
}
/* #endif */

/* #ifdef H5 */
uni-page-body {
  height: 100%;
}
/* #endif */
// /* stylelint-disable selector-type-no-unknown */
// button::after {
//   border: none;
// }

// swiper,
// scroll-view {
//   flex: 1;
//   height: 100%;
//   overflow: hidden;
// }

// image {
//   width: 100%;
//   height: 100%;
//   vertical-align: middle;
// }

// // 单行省略，优先使用 unocss: text-ellipsis
// .ellipsis {
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }

// // 两行省略
// .ellipsis-2 {
//   display: -webkit-box;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   -webkit-line-clamp: 2;
//   -webkit-box-orient: vertical;
// }

// // 三行省略
// .ellipsis-3 {
//   display: -webkit-box;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
// }
</style>
