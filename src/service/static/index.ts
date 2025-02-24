import { http, httpGet } from '@/utils/http'


/** GET 请求 */
export const getFocusPictureList = (focusID: string) => {
  return http.get('/getFocusPictureList.json', { focusID })
}

/** 静默登录 */
export const onLogin = (openID: string, deviceID: string, siteID: string) => {
  return http.get('/openIDorUnionIDFastLogin.json', { openID, deviceID, siteID })
}

// 获取用户信息
const getUserInfo = (loginInfo: ILoginInfo) => {
  return http.get('/getOneMemberDetail.json', loginInfo)
}

// 获取停车场列表
const getParkList = (loginInfo: ILoginInfo, phone: string) => {
  return http.get('/getParkAreaList.json', { loginInfo, phone })
}

// 文档未描述当前接口信息
const getVehicleProcessList = (loginInfo: ILoginInfo) => {
  return http.get('/getVehicleProcessList', { loginInfo, sortTypeTime: 2 })
}

// 违停记录信息
const getReleaseVehicleList = (loginInfo: ILoginInfo, vehicleProcessID: string) => {
  return httpGet('/getVehicleViolationList.json', { loginInfo, vehicleProcessID })
}

// 查询车牌信息
const getVehicleList = (loginInfo: ILoginInfo, applicationID: string) => {
  return http.get('/getVehicleList.json', { loginInfo, applicationID })
}

export {
  getUserInfo,
  getParkList,
  getVehicleProcessList,
  getReleaseVehicleList,
  getVehicleList
}