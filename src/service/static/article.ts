import type { ContentTypeEnum } from '@/hooks/constants'
import { http } from '@/utils/http'

export interface Article {
  /** 文章唯一标识符 */
  articleID: string
  /** 文章名称 */
  name: string

  /** 文章标题 */
  title: string
  /** 文章副标题（可选） */
  subTitle?: string
  /** 作者 */
  arthur?: string
  /** 文章关键字 */
  keywords?: string

  /** 文章描述 */
  description?: string
  /** 文章内容（HTML格式） */
  content: string
  /** 文章类型（枚举，如 99=一般文章） */
  contentType: ContentTypeEnum

  /** 发布时间（时间戳） */
  beginDate?: number
  /** 发布时间（格式化字符串） */
  beginDateStr?: string
  /** 文章失效时间（时间戳） */
  endDate?: number | null
  /** 文章失效时间（格式化字符串） */
  endDateStr?: string | null

  /** 阅读次数 */
  readTimes: number
  /** 浏览次数 */
  browseTimes: number
  /** 是否已发布（1=已发布，0=未发布） */
  isPublish: number

  /** 封面图片URL */
  faceImage?: string | null
}

export interface GetArticleType {
  /** 文章关键字 */
  keyWords?: string
  /** 文章类型 */
  contentType?: ContentTypeEnum
}

/** Get文章列表 */
export function getArticleList(params?: GetArticleType) {
  return http.get<IPageData<Article>>('/getArticleList.json', {
    applicationID: APPLICATIONID,
    ...params,
  })
}

interface ApiArticleDto {
  apiArticleDto: {
    articleID: string
    name: string

    /** 文章标题 */
    title: string
    /** 首张图片 */
    faceImage: string | null
    /** html 内容块 */
    contentText: string | null
    /** 日期 */
    createdDateStr: string
  }
}

/** Get文章详情 */
export function getArticleSimpleDetail(articleID: string) {
  return http.get<ApiArticleDto>('/getArticleSimpleDetail.json', {
    outToken: OUTTOKEN,
    articleID,
  })
}
