import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFeature = defineStore(
  'feature',
  () => {
    /** 当前车辆ID */
    const vehicleID = ref<string>()
    /** 车牌号 */
    const sequenceCode = ref<string>()

    return {
      vehicleID,
      sequenceCode,

    }
  },
  {
    persist: true,
  },
)
