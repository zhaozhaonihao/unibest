import { http } from '@/utils/http'

interface HotWordItem {
  applicationID: string
  applicationName: string
  companyID: string
  companyName: string
  hotWordID: string
  id: string
  isLock: boolean
  name: string
  objectDefineID: string
  objectDefineName: string
  objectID: string
  orderSeq: number
  searchDefineID: string
  searchDefineName: string
  siteID: string
  siteName: string
  usedTotal: number
}

/** 系统推荐的热词 */
export function getHotWordList() {
  return http.get<IPageData<HotWordItem>>('/getHotWordList', {
    searchDefineID: SEARCHDEFINEID,
  })
}
