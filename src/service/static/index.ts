import { http } from '@/utils/http'

/** GET 请求 */
export const getFocusPictureList = (focusID: string) => {
  return http.get('/getFocusPictureList.json', { focusID })
}
