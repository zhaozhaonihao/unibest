import { http } from '@/utils/http'

export type MemberMajor = {
  majorID: string
}

/** 登录授权页面 获取手机号 */
export const getWeixinMemberPhone = (encryptedData: string, iv: string, code: string) => {
  return http.get<IPageData<{ phoneNumber: string }>>('/getWeixinMemberPhone.json', {
    appID: APPID,
    encryptedData,
    iv,
    js_code: code,
  })
}

/** 获取openID */
export const getWeiXinAppOpenId = (code: string) => {
  return http.get<{ openID: string }>('/getWeiXinAppOpenId.json', {
    publicNo: PUBLICNO,
    js_code: code,
  })
}

/** 静默登录 */
export const openIDorUnionIDFastLogin = (openID: string) => {
  return http.get<ILoginSession>('/openIDorUnionIDFastLogin.json', {
    deviceID: DEVICEID,
    siteID: SITEID,
    openID,
  })
}

/** 查询城管身份 */
export const getMyMemberMajorList = () => {
  return http.get<IPageData<MemberMajor>>('/getMyMemberMajorList.json')
}

/** 查询所属公司 */
export const getMyCompanyAndEmployeeList = () => {
  return http.get('/getMyCompanyAndEmployeeList.json')
}

/** 会员信息 */
export const getOneMemberDetail = () => {
  return http.get<{ phone: string }>('/getOneMemberDetail.json')
}
