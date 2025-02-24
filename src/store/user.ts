import { defineStore } from 'pinia'
import {
  type MemberMajor,
  getMyMemberMajorList,
  getOneMemberDetail,
  getWeiXinAppOpenId,
  openIDorUnionIDFastLogin,
} from '@/service/static/login'

import dayjs from 'dayjs'

export const useUserStore = defineStore(
  'user',
  () => {
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
        openID.value = 'oMtfx6zNY_ULesEzXWbFkI0iHELo'
        // #endif
      }

      return openID.value
    }

    const loginInfo = ref<ILoginSession>()
    const isLoginExpired = computed(() => {
      return !loginInfo.value || dayjs().diff(loginInfo.value.time, 'minute') > 60
    })
    const onLogin = async () => {
      if (openID.value) {
        const { run } = useRequest(() => openIDorUnionIDFastLogin(openID.value))
        const res = await run()
        loginInfo.value = { ...res, time: dayjs() }
        getMemberInfo()
      }
    }
    const isLogined = computed(() => loginInfo.value.memberID && loginInfo.value.sessionID)

    const member = ref<MemberMajor[]>([])
    const getMemberInfo = async () => {
      const { run } = useRequest(() => getMyMemberMajorList())
      const res = await run()
      member.value = res.rows
    }

    const memberDetail = ref()
    const getOnmberDetail = async () => {
      const { run } = useRequest(() => getOneMemberDetail())
      const res = await run()
      console.log('getOneMemberDetail', res)
    }

    const isChengguan = computed(() => {
      return member.value.some((item) => item.majorID === MAJOR_ID_CHENGGUAN)
    })

    return {
      openID,
      getOpenId,

      loginInfo,
      isLoginExpired,
      onLogin,
      isLogined,

      member,
      getMemberInfo,

      getOnmberDetail,

      isChengguan,
    }
  },
  {
    persist: true,
  },
)
