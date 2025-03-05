import { useUserStore } from '@/store'
import { http } from '@/utils/http'
import dayjs from 'dayjs'

export interface RouteInstance {
  routeInstanceID: string
  /** 关联的路线名称 */
  routeDefineName: string
  /** 巡视实例名称 */
  name: string
  /** 巡视实例简称 */
  shortName: string

  employeeName: string

  realBeginTime: number | null
  realBeginTimeStr: string
  realEndTime: number | null
  realEndTimeStr: string | null
}
export function getRouteInstanceList(params: {
  routeDefineID: string
  memberID?: string
  employeeID?: string
  sortTypeTime?: 1 | 2
}) {
  return http.get<IPageData<RouteInstance>>('/getRouteInstanceList.json', {
    memberID: useUserStore().loginSession.memberID,
    sortTypeTime: 2,
    ...params,
  })
}

export interface RouteDefine {
  routeDefineID: string
  name: string
}
/** 获取路线定义列表 */
export function getRouteDefineList() {
  return http.get<IPageData<RouteDefine>>('/getRouteDefineList.json')
}

export function createOneRouteInstance(params: {
  routeDefineID: string
  name: string
  memberID?: string
  employeeID?: string
  planDate?: string
}) {
  return http.get('/createOneRouteInstance.json', {
    memberID: useUserStore().loginSession.memberID,
    planDate: dayjs().format('YYYY-MM-DD'),
    ...params,
  })
}

export interface RouteInstanceDot {
  routeInstanceDotID: string
  name: string

  routeDefineDotID: string
  routeDefineDotName: string
  routeDefineID: string
  routeDefineName: string
  routeInstanceID: string
  routeInstanceName: string
  serviceCompanyID: string
  serviceCompanyName: string
}
export function getRouteInstanceDotList(params: {
  memberID: string
  routeDefineID?: string
  routeInstanceID: string
  routeDefineDotID?: string
}) {
  return http.get<IPageData<RouteInstanceDot>>('/getRouteInstanceDotList.json', {
    ...params,
  })
}

export interface BeginOneRouteInstance {
  realBeginTime: string
}
export function beginOneRouteInstance(params: {
  routeInstanceID: string
}) {
  return http.get<IPageData<BeginOneRouteInstance>>('/beginOneRouteInstance.json', {
    ...params,
  })
}
export interface EndOneRouteInstance {
  realEndTime: string
}
export function endOneRouteInstance(params: {
  routeInstanceID: string
}) {
  return http.get<IPageData<EndOneRouteInstance>>('/endOneRouteInstance.json', {
    ...params,
  })
}
