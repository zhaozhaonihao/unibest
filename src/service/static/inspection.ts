import { http } from '@/utils/http'
import dayjs from 'dayjs'

export interface RouteDefine {
  routeDefineID: string
  name: string
}

export interface RouteInstance {
  routeInstanceID: string
  /** 关联的路线名称 */
  routeDefineName: string
  /** 巡视实例名称 */
  name: string
  /** 巡视实例简称 */
  shortName: string

  employeeName: string

  planBeginTime: string
  planEndTime: string
  realBeginTime: string
  realEndTime: string
}
export function getRouteInstanceList(routeDefineID: string, employeeID: string) {
  return http.get<IPageData<RouteInstance>>('/getRouteInstanceList.json', {
    routeDefineID,
    employeeID,
  })
}

/** 获取路线定义列表 */
export const getRouteDefineList = () => http.get<IPageData<RouteDefine>>('/getRouteDefineList.json')

export function createOneRouteInstance(routeDefineID: string, employeeID: string, name: string) {
  return http.get('/createOneRouteInstance.json', {
    routeDefineID,
    name,
    employeeID,
    planDate: dayjs().format('YYYY-MM-DD'),
  })
}

export function getRouteInstanceDotList(routeDefineID: string) {
  return http.get('/getRouteInstanceDotList.json', {
    routeDefineID,
  })
}
