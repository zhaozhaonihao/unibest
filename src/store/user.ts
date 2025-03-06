import {
  bandingEmployeeWithPhone,
  getMyCompanyAndEmployeeList,
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
            openID.value = (await run()).openID
            await onLogin()
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

    const { data: loginSession, run: RunGetIDFastLogin } = useRequest(() => openIDorUnionIDFastLogin(openID.value))
    const { data: MyMajorList, run: RunGetMyMajor } = useRequest(() => getMyMemberMajorList())
    const { data: MyCompanyAndEmployeeList, run: RunGetMyCompanyAndEmployee } = useRequest(() => getMyCompanyAndEmployeeList())
    const { data: OneMemberDetail, run: RunGetOneMemberDetail } = useRequest(() => getOneMemberDetail(loginSession.value.memberID))
    const { data: BandingEmployee, run: RunBandingEmployee } = useRequest(() => bandingEmployeeWithPhone(OneMemberDetail.value?.phone))

    const onLogin = async () => {
      if (openID.value) {
        // 静态登录
        await RunGetIDFastLogin()
        if (loginSession.value) {
          loginSession.value = { ...loginSession.value, time: dayjs() }
        }

        // 获取身份列表
        await RunGetMyMajor()
        // 获取会员信息
        await RunGetOneMemberDetail()

        if (isChengguan.value) {
          await RunGetMyCompanyAndEmployee()

          if (!MyCompanyAndEmployeeList.value.length) {
            await RunBandingEmployee()
          }
        }
      }
    }

    const isLogined = computed(() => loginSession.value?.memberID && loginSession.value?.sessionID)
    const isLoginExpired = computed(() => {
      return !loginSession.value || dayjs().diff(loginSession.value.time, 'minute') > 60
    })

    const isChengguan = computed(() => {
      return MyMajorList.value?.rows.some(item => item.majorID === MAJOR_ID_CHENGGUAN)
    })

    const employeeID = computed(() => MyCompanyAndEmployeeList.value?.[0]?.employeeID ?? '')

    // 头像
    const avatarURL = computed(() => OneMemberDetail.value.avatarURL || 'https://imgs.699pic.com/images/500/465/562.jpg!list1x.v2')

    return {
      openID,
      getOpenId,

      loginSession,
      onLogin,

      MyMajorList,
      MyCompanyAndEmployeeList,
      OneMemberDetail,
      RunGetOneMemberDetail,
      BandingEmployee,

      isLogined,
      isLoginExpired,
      isChengguan,
      employeeID,

      avatarURL,
    }
  },
  {
    persist: true,
  },
)
