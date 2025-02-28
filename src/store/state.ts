import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLocationStore = defineStore(
  'location',
  () => {
    const latitude = ref(null) // 纬度
    const longitude = ref(null) // 经度
    const address = ref('') // 详细地址（如果需要）

    // 获取位置
    const fetchLocation = () => {
      uni.getLocation({
        success: (res) => {
          latitude.value = res.latitude
          longitude.value = res.longitude
          console.log('获取位置成功：', res)
        },
        fail: (err) => {
          console.error('获取位置失败：', err)
        },
      })
    }

    return {
      latitude,
      longitude,
      address,
      fetchLocation,
    }
  },
  {
    persist: true, // 持久化存储
  },
)
