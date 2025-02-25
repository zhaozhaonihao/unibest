import { defineStore } from 'pinia'
import { getWeiXinAppOpenId } from '@/service/static/login'

const initState = { nickname: '', avatar: '' }
const ininLoginInfo = { sessionID: '', memberID: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })
    const openID = ref<string | undefined>()

    const getOpenId = () => {
      if (!openID.value) {
        // #ifdef MP-WEIXIN
        uni.login({
          provider: 'weixin',
          success: async ({ code }) => {
            const { run } = useRequest(() => getWeiXinAppOpenId(code))
            const res = await run()
            openID.value = res.openID
          },
        })
        // #endif
        // #ifdef H5
        console.log('🐛 发起网络请求获取 openID ......')
        openID.value = '123'
        // #endif
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

    // 登录信息
    const loginInfo = ref<ILoginInfo>({ ...ininLoginInfo })

    return {
      openID,
      getOpenId,

      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
      loginInfo
    }
  },
  {
    persist: true,
  },
)
