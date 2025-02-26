import { http } from '@/utils/http'

export interface ParkArea {
  name: string
}

export function getParkAreaList(phone: string) {
  return http.get<IPageData<ParkArea>>('/getParkAreaList.json', {
    phone,
  })
}
