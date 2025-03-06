import { http } from '@/utils/http'

export interface ParkArea {
  parkAreaID: string
  name: string
  address: string
}
export function getParkAreaList(phone: string) {
  return http.get<IPageData<ParkArea>>('/getParkAreaList.json', {
    phone,
  })
}

export interface ParkUnit {
  parkUnitID: string
  propertyID: string
  name: string
  code: string
}
export function getParkUnitList(phone: string) {
  return http.get<IPageData<ParkUnit>>('/getParkUnitList.json', {
    phone,
  })
}

export interface VehicleProcess {
  vehicleProcessId: string
  name: string
  employeeID: string | null
  memberID: string | null

  /** 出发时间 */
  leftTime: string
}
export function getVehicleProcessList(params: {
  memberID?: string
  employeeID?: string
} = {}) {
  return http.get<IPageData<VehicleProcess>>('/getVehicleProcessList.json', {
    sortTypeTime: 1,
    pageNumber: 20,
    ...params,
  })
}

export function createOneVehicleProcess(params: {
  name: string
}) {
  return http.get<VehicleProcess>('/createOneVehicleProcess.json', {
    ...params,
  })
}

export function beginOneVehicleProcess(params: {
  vehicleProcessID: string // createOneVehicleProcess响应的ID
}) {
  return http.get<VehicleProcess>('/beginOneVehicleProcess.json', {
    ...params,
  })
}

export function submObjectAttachment(params: {
  objectID: string
  objectName: string
  objectDefineID?: string
  imageUrl: string
  name?: string
}) {
  return http.get<IPageData<ParkArea>>('/submObjectAttachment.json', {
    objectDefineID: '8a2f462a9473d8b401947d736c0a0428',
    name: '开始全景图',
    ...params,
  })
}
