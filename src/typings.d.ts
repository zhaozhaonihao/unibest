// 全局要用的类型放到这里

declare global {
  type IResData<T> = {
    body: T & { data: T }
    header: { code: number; msg: string }
  }

  interface IPageData<T> {
    total: number
    currentPage: number
    currentPgeNumber: number
    pageNumber: number
    totalPage: number
    hasNextPage: boolean
    rows: T[]
  }

  // uni.uploadFile文件上传参数
  type IUniUploadFileOptions = {
    file?: File
    files?: UniApp.UploadFileOptionFiles[]
    filePath?: string
    name?: string
    formData?: any
  }

  type IUserInfo = {
    nickname?: string
    avatar?: string
    /** 微信的 openid，非微信没有这个字段 */
    openid?: string
    token?: string
  }
}

/* eslint-disable */
export { }
