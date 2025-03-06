import { http } from '@/utils/http'

export interface IFooItem {
  id: string
  name: string
}

/** GET 请求 */
export function getFooAPI(name: string) {
  return http.get<IFooItem>('/foo', { name })
}

/** POST 请求 */
export function postFooAPI(name: string) {
  return http.post<IFooItem>('/foo', { name }, { name })
}
