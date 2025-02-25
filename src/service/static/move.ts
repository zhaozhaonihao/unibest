import { http } from '@/utils/http'

export type ParkArea = {
  name: string
}

export const getParkAreaList = (phone: string) => {
  return http.get<IPageData<ParkArea>>('/getParkAreaList.json', {
    phone,
  })
}
