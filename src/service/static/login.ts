import { http } from '@/utils/http'

/** 登录授权页面 获取手机号 */
export function getWeixinMemberPhone(encryptedData: string, iv: string, code: string) {
  return http.get<IPageData<{ phoneNumber: string }>>('/getWeixinMemberPhone.json', {
    appID: APPID,
    encryptedData,
    iv,
    js_code: code,
  })
}

/** 获取openID */
export function getWeiXinAppOpenId(code: string) {
  return http.get<{ openID: string }>('/getWeiXinAppOpenId.json', {
    publicNo: PUBLICNO,
    js_code: code,
  })
}

/** 静默登录 */
export function openIDorUnionIDFastLogin(openID: string) {
  return http.get<ILoginSession>('/openIDorUnionIDFastLogin.json', {
    deviceID: DEVICEID,
    siteID: SITEID,
    openID,
  })
}

export interface MemberMajor {
  majorID: string
}
/** 获取身份 */
export function getMyMemberMajorList() {
  return http.get<IPageData<MemberMajor>>('/getMyMemberMajorList.json')
}

export interface CompanyAndEmployee {
  employeeID: string
}
/** 查询所属公司 */
export function getMyCompanyAndEmployeeList() {
  return http.get<CompanyAndEmployee[]>('/getMyCompanyAndEmployeeList.json', {
    companyID: COMPANYID,
  })
}

export interface OneMemberDetail {
  phone: string
  avatarURL: string
  propertyID: string
}
/** 会员信息 */
export function getOneMemberDetail(memberID: string) {
  return http.get<OneMemberDetail>('/getOneMemberDetail.json', { memberID })
}

export interface EmployeeWithPhone {
  employeeID: string
}
export function bandingEmployeeWithPhone(phone: string) {
  return http.get<EmployeeWithPhone>('/bandingEmployeeWithPhone.json', { phone })
}
