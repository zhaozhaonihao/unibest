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
export const getFocusPictureList = () => {
  return http.get<IPageData<Picture>>('/getFocusPictureList.json', { focusID: FOCUSID })
}

/** 通知公告 */
export const getNoticeArticleList = () => {
  return http.get<IPageData<Notice>>('/getNoticeArticleList.json', { shopID: SHOPID })
}

/** 获取文章 */
export const getNavigatorSimpleArticleList = (navigatorID: string, pageNumber?: number) => {
  return http.get<IPageData<News>>('/getNavigatorSimpleArticleList.json', {
    navigatorID,
    pageNumber,
  })
}
