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
