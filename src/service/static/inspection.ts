import { http } from '@/utils/http'
import dayjs from 'dayjs'
import { useUserStore } from '@/store'

export type RouteDefine = {
  routeDefineID: string
  name: string
}

export const getRouteInstanceList = (routeDefineID: string) => {
  return http.get<IPageData<{ phoneNumber: string }>>('/getRouteInstanceList.json', {
    routeDefineID,
  })
}

/** 获取路线定义列表 */
export const getRouteDefineList = () => http.get<IPageData<RouteDefine>>('/getRouteDefineList.json')

export const createOneRouteInstance = (routeDefineID: string, employeeID: string, name: string) => {
  return http.get('/createOneRouteInstance.json', {
    routeDefineID,
    name,
    employeeID,
    planDate: dayjs().format('YYYY-MM-DD'),
  })
}

export const getRouteInstanceDotList = (routeDefineID: string) => {
  return http.get('/getRouteInstanceDotList.json', {
    routeDefineID,
  })
}
