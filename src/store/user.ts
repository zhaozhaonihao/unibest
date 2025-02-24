import { defineStore } from 'pinia'
import { getWeiXinAppOpenId } from '@/service/static/login'

const initState = { nickname: '', avatar: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const openID = ref<string | undefined>()

    const getOpenId = () => {
      console.log('🐛', 'getOpenId')

      if (!openID.value) {
        uni.login({
          provider: 'weixin',
          success: async ({ code }) => {
            const { run } = useRequest(() => getWeiXinAppOpenId(code))
            const res = await run()
            openID.value = res.openID
            console.log('🐛', 'openID', openID.value)
          },
        })
      }
    }

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      openID,
      getOpenId,

      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
