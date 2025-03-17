import type { ObjectDefineIDEnum } from '@/hooks/constants'
import { http } from '@/utils/http'

/**
 * 获取指定对象的附件列表
 *
 * @param params - 请求参数对象
 * @param params.objectID - 对象标识符枚举，用于指定要查询的关联对象类型或实例
 * @returns 返回包含附件列表数据的Promise对象
 */
export function getObjectAttachmentList(params: {
  objectID: string
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

interface AttachmentParams {
  /**
   * 对象定义ID
   * - 意见反馈: 8a2f462a5ebc4863015ebc755ff70455
   * - 巡视点检查: 8a2f462a926b2ea701926b4bb6b7003c
   * - 挪车全景图: 8a2f462a9473d8b401947d736c0a0428
   */
  objectDefineID: ObjectDefineIDEnum
  /**
   * 对象ID
   * - 意见反馈: feedID
   * - 巡视点检查: routeInstanceDotID
   * - 挪车全景图: vehicleProcessId
   */
  objectID: string
  /** 对象ID 对应的名称 */
  objectName: string
  /** 图片附件地址 */
  imageUrl: string
  // /** 写死='1'？ */
  // fileType: '1'
  // /** 写死='1'？ */
  // showType: '1'
}
export function submObjectAttachment(params: AttachmentParams) {
  return http.get('/submObjectAttachment.json', {
    ...params,
  })
}
