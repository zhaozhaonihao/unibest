import { http } from '@/utils/http'

export interface Picture {
  focusPictureID: string
  picturePath: string
}

export interface Notice {
  articleID: string
  title: string
}

export interface News {
  articleID: string
  faceImage: string
  title: string
  description: string
  createdTimeStr: Date
}

/** 轮播图 */
export function getFocusPictureList() {
  return http.get<IPageData<Picture>>('/getFocusPictureList.json', { focusID: FOCUSID })
}

/** 通知公告 */
export function getNoticeArticleList() {
  return http.get<IPageData<Notice>>('/getNoticeArticleList.json', { shopID: SHOPID })
}

/** 获取文章 */
export function getNavigatorSimpleArticleList(navigatorID: string, pageNumber?: number) {
  return http.get<IPageData<News>>('/getNavigatorSimpleArticleList.json', {
    navigatorID,
    pageNumber,
  })
}
