import { http, httpGet } from '@/utils/http'


export interface Picture {
  focusPictureID: string
  picturePath: string
}

export interface Notice {
  articleID: string
  title: string
}

export interface News {
  articleID: string
  faceImage: string
  title: string
  description: string
  createdTimeStr: Date
}

/** 轮播图 */
export function getFocusPictureList() {
  return http.get<IPageData<Picture>>('/getFocusPictureList.json', { focusID: FOCUSID })
}

/** 通知公告 */
export function getNoticeArticleList() {
  return http.get<IPageData<Notice>>('/getNoticeArticleList.json', { shopID: SHOPID })
}

/** 获取文章 */
export function getNavigatorSimpleArticleList(navigatorID: string, pageNumber?: number) {
  return http.get<IPageData<News>>('/getNavigatorSimpleArticleList.json', {
    navigatorID,
    pageNumber,
  })
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