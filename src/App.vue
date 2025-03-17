<script setup lang="ts">
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'

onLaunch(async () => {
  console.log('App Launch')

  const userStore = useUserStore()
  userStore.getOpenId()

  if (userStore.isLoginExpired) {
    await userStore.handleAuth('wxLogin')
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

</style>
