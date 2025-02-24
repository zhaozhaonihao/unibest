// 全局要用的类型放到这里

declare global {
  type IResData<T> = {
    body: T & { data: T }
    header: { code: number; msg: string }
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

  type ILoginInfo = {
    sessionID: string
    memberID: string
  }
}

export { } // 防止模块污染
