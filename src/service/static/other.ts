import type { ObjectIDEnum } from '@/hooks/constants'
import { ContentTypeEnum } from '@/hooks/constants'
import { http } from '@/utils/http'

export interface Article {
  articleID: string // 文章唯一标识符
  name: string // 文章名称

  title: string // 文章标题
  subTitle?: string // 文章副标题（可选）
  arthur?: string // 作者
  keywords?: string // 文章关键字

  description?: string // 文章描述
  content: string // 文章内容（HTML格式）
  contentType: ContentTypeEnum // 文章类型（枚举，如 99=一般文章）

  beginDate?: number // 发布时间（时间戳）
  beginDateStr?: string // 发布时间（格式化字符串）
  endDate?: number | null // 文章失效时间（时间戳）
  endDateStr?: string | null // 文章失效时间（格式化字符串）

  readTimes: number // 阅读次数
  browseTimes: number // 浏览次数
  isPublish: number // 是否已发布（1=已发布，0=未发布）

  faceImage?: string | null // 封面图片URL
}

export function getArticleList(params?: {
  keyWords?: string
  contentType?: ContentTypeEnum
}) {
  return http.get<IPageData<Article>>('/getArticleList.json', {
    applicationID: APPLICATIONID,
    contentType: ContentTypeEnum.一般文章,
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
export function getArticleSimpleDetail(params: {
  articleID: string
}) {
  return http.get<ApiArticleDto>('/getArticleSimpleDetail.json', {
    outToken: OUTTOKEN,
    ...params,
  })
}

/**
 * 获取指定对象的附件列表
 *
 * @param params - 请求参数对象
 * @param params.objectID - 对象标识符枚举，用于指定要查询的关联对象类型或实例
 * @returns 返回包含附件列表数据的Promise对象
 */
export function getObjectAttachmentList(params: {
  objectID: ObjectIDEnum
}) {
  return http.get('/getObjectAttachmentList.json', {
    ...params,
  })
}

export interface Employee {
  employeeID: string
  name: string
  phone: string
  code: string
  orderSeq: number
  titleID: string
  titleName: string
  age: number
  departmentID: string
  departmentName: string
  jobID: string
  jobName: string
  joinDate: number
  joinDateStr: Date
  jobStatus: number
  payType: number
  memberID: string
}

export function getEmployeeList(params?: {
  companyID?: string
}) {
  return http.get<IPageData<Employee>>('/getEmployeeList.json', {
    companyID: COMPANYID,
    ...params,
  })
}
