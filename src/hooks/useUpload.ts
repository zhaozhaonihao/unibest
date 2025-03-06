import type { UnwrapRef } from 'vue'
import { getEnvBaseUploadUrl } from '@/utils'

const VITE_UPLOAD_BASEURL = `${getEnvBaseUploadUrl()}`

function uploadFile<T>({ tempFilePath, formData }) {
  return new Promise((resolve, reject) => {
    uni.uploadFile({
      url: VITE_UPLOAD_BASEURL,
      filePath: tempFilePath,
      name: 'file',
      formData,
      success: (res) => {
        const { statusCode, data: resData } = res
        const { header, body } = JSON.parse(resData) as IResData<T>

        // 判断状态码和接口自定义的 code 是否正常
        const isSuccess = statusCode >= 200 && statusCode < 300 && header?.code === 0

        const result = body.data || body

        // 在日志中显示响应内容
        console.log(
          `${isSuccess ? '✅' : '❌'}------------------------------------------------\n[Params]:`,
          formData,
          `\n[Response ${header?.code}]:`,
          result,
          `\n--------------------------------------------------`,
        )
        isSuccess ? resolve(result) : reject(result)
      },
      fail: (err) => {
        console.error('uni.uploadFile err->', err)
        reject(err)
      },
      complete: () => { },
    })
  })
}

/** 选择图片（兼容微信小程序和 H5） */
function chooseImage(): Promise<string> {
  return new Promise((resolve, reject) => {
    // #ifdef MP-WEIXIN
    uni.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: res => resolve(res.tempFiles[0].tempFilePath),
      fail: reject,
    })
    // #endif

    // #ifndef MP-WEIXIN
    uni.chooseImage({
      count: 1,
      success: res => resolve(res.tempFilePaths[0]),
      fail: reject,
    })
    // #endif
  })
}

/**
 * useUpload 是一个定制化的请求钩子，用于处理上传图片。
 * @param formData 额外传递给后台的数据，如{name: '菲鸽'}。
 * @returns 返回一个对象{loading, error, data, run}，包含请求的加载状态、错误信息、响应数据和手动触发请求的函数。
 */
export default function useUpload<T = IUploadData>(formData: Record<string, any> = {}) {
  const loading = ref(false)
  const error = ref(false)
  const data = ref<T>(null)

  // 选择图片并上传
  const run = async () => {
    loading.value = true
    try {
      // 获取临时文件路径
      const tempFilePath = await chooseImage()
      if (!tempFilePath)
        throw new Error('图片选择失败')

      const result = await uploadFile<T>({ tempFilePath, formData })
      data.value = result as UnwrapRef<T>
      error.value = false
      return data.value
    }
    catch (err) {
      error.value = err
    }
    finally {
      loading.value = false
    }
  }

  return { loading, error, data, run }
}
