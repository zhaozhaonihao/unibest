import { http } from '@/utils/http'

export interface MemberPhone {
  phoneNumber: string
}

export const openIDorUnionIDFastLogin = (code: string) => {
  return http.get<IPageData<MemberPhone>>('/openIDorUnionIDFastLogin.json', {
    publicNo: PUBLICNO,
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

export const getWeixinMemberPhone = (encryptedData: string, iv: string, code: string) => {
  return http.get<IPageData<MemberPhone>>('/getWeixinMemberPhone.json', {
    appID: APPID,
    encryptedData,
    iv,
    js_code: code,
  })
}
