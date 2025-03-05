import { http } from '@/utils/http'

export function getVehicleList(params: {
  vehicleProcessID: string
}) {
  return http.get('/getVehicleList.json', {
    ...params,
  })
}
