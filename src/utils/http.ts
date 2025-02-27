import type { CustomRequestOptions } from '@/interceptors/request'
import { useUserStore } from '@/store'

export function http<T>(options: CustomRequestOptions) {
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
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
        //   resolve(res.data as IResData<T>)
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
        //       title: (res.data as IResData<T>).msg || '请求错误',
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

        // 如果后端返回 10000，表示需要重新登录
        if (header?.code === 10000 && header.msg === '请先登录') {
          // 调用 onLogin 获取新 token
          useUserStore()
            .onLogin()
            // 重发请求
            .then(() => http<T>(options))
            .then(reResult => resolve(reResult))
            .catch(err => reject(err))
        }
        else {
          isSuccess ? resolve(result) : reject(result)
        }
      },
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

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns 包含响应数据的 Promise 对象
 */
export function httpGet<T>(url: string, query?: Record<string, any>) {
  return http<T>({
    url,
    query,
    method: 'GET',
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns 包含响应数据的 Promise 对象
 */
export function httpPost<T>(url: string, data?: Record<string, any>, query?: Record<string, any>) {
  return http<T>({
    url,
    query,
    data,
    method: 'POST',
  })
}

http.get = httpGet
http.post = httpPost
