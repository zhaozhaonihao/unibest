import { defineStore } from 'pinia'
import {
  EmployeeWithPhone,
  type MemberMajor,
  OneMemberDetail,
  bandingEmployeeWithPhone,
  type CompanyAndEmployee,
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

    const loginSession = ref<ILoginSession>()
    const isLogined = computed(() => loginSession.value.memberID && loginSession.value.sessionID)
    const isLoginExpired = computed(() => {
      return !loginSession.value || dayjs().diff(loginSession.value.time, 'minute') > 60
    })
    const onLogin = async () => {
      if (openID.value) {
        // 静态登录
        const { run: FastLogin } = useRequest(() => openIDorUnionIDFastLogin(openID.value))
        loginSession.value = { ...(await FastLogin()), time: dayjs() }

        // 城管身份 查询
        await getMemberInfo()

        if (isChengguan.value) {
          await CompanyAndEmployee()
        }
      }
    }

    // 查询当前身份列表
    const member = ref<MemberMajor[]>([])
    const getMemberInfo = async () => {
      const { run } = useRequest(() => getMyMemberMajorList())
      member.value = (await run()).rows
    }
    const isChengguan = computed(() => {
      return member.value.some((item) => item.majorID === MAJOR_ID_CHENGGUAN)
    })

    const CompanyAndEmployeeList = ref<CompanyAndEmployee>()
    const CompanyAndEmployee = async () => {
      const { run: MyCompany } = useRequest(() => getMyCompanyAndEmployeeList())
      const EmployeeList = await MyCompany()

      CompanyAndEmployeeList.value = EmployeeList[0]

      if (!EmployeeList.length) {
        await OneMember()
        await BandingEmployee()
      }
    }

    const OneMemberDetail = ref<OneMemberDetail>()
    const OneMember = async () => {
      const { run } = useRequest(() => getOneMemberDetail())
      OneMemberDetail.value = await run()
    }

    const Employee = ref<EmployeeWithPhone>()
    const BandingEmployee = async () => {
      const { run } = useRequest(() => bandingEmployeeWithPhone(OneMemberDetail.value?.phone))
      Employee.value = await run()
    }

    return {
      openID,
      getOpenId,

      loginSession,
      isLoginExpired,
      onLogin,
      isLogined,

      member,
      getMemberInfo,

      OneMemberDetail,
      OneMember,

      isChengguan,

      Employee,
      CompanyAndEmployeeList,
    }
  },
  {
    persist: true,
  },
)
