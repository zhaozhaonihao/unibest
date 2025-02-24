import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = { nickname: '', avatar: '' }
const ininLoginInfo = { sessionID: '', memberID: '' }

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

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
