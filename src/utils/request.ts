import { CustomRequestOptions } from '@/interceptors/request'

/**
 * 请求方法: 主要是对 uni.request 的封装，去适配 openapi-ts-request 的 request 方法
 * @param options 请求参数
 * @returns 返回 Promise 对象
 */
const http = <T>(options: CustomRequestOptions) => {
  // 1. 返回 Promise 对象
  return new Promise<T>((resolve, reject) => {
    uni.request({
      ...options,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        // // 状态码 2xx，参考 axios 的设计
        // if (res.statusCode >= 200 && res.statusCode < 300) {
        //   // 2.1 提取核心数据 res.data
        //   resolve(res.data as T)
        // } else if (res.statusCode === 401) {
        //   // 401错误  -> 清理用户信息，跳转到登录页
        //   // userStore.clearUserInfo()
        //   // uni.navigateTo({ url: '/pages/login/login' })
        //   reject(res)
        // } else {
        //   // 其他错误 -> 根据后端错误信息轻提示
        //   !options.hideErrorToast &&
        //     uni.showToast({
        //       icon: 'none',
        //       title: (res.data as T & { msg?: string })?.msg || '请求错误',
        //     })
        //   reject(res)
        // }
        // 请求成功
        const { statusCode, data } = res
        const { header, body } = data as IResData<T>

        // 判断状态码和接口自定义的 code 是否正常
        const isSuccess = statusCode >= 200 && statusCode < 300 && header?.code === 0

        const result = isSuccess ? body.data || body : (data as any)

        // 在日志中显示响应内容
        console.log(
          `${isSuccess ? '✅' : '❌'}------------------------------------------------\n[Request]:`,
          options.url,
          `\n[Params]:`,
          options.query,
          `\n[Response ${header?.code}]:`,
          result,
          `\n--------------------------------------------------`,
        )

        // if (header?.code === 10000) {
        //   mineStore.onLogin()
        // }

        // 如果是成功的响应，resolve 返回结果，否则 reject 错误信息
        isSuccess ? resolve(result) : reject(result)
      },
      // 响应失败
      fail(err) {
        uni.showToast({
          icon: 'none',
          title: '网络错误，换个网络试试',
        })
        reject(err)
      },
    })
  })
}

/*
 * openapi-ts-request 工具的 request 跨客户端适配方法
 */
export default function request<T = unknown>(
  url: string,
  options: Omit<CustomRequestOptions, 'url'> & {
    params?: Record<string, unknown>
    headers?: Record<string, unknown>
  },
) {
  const requestOptions = {
    url,
    ...options,
  }

  if (options.params) {
    requestOptions.query = requestOptions.params
    delete requestOptions.params
  }

  if (options.headers) {
    requestOptions.header = options.headers
    delete requestOptions.headers
  }

  return http<T>(requestOptions)
}
