import type { ObjectIDEnum } from '@/hooks/constants'
import { http } from '@/utils/http'
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
