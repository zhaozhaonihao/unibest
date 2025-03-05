import { beginOneVehicleProcess } from '@/service/static/move'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMoveTask = defineStore(
  'moveTask',
  () => {
    /** 当前 车辆处理任务的 ID */
    const vehicleProcessID = ref<string>('')

    /**
     * vehicleProcessID: 2638816f24ec4705b34dbc69a45ee1cf
     * beginTime: 2025-03-03 11:15:56
     */
    const { data: BeginOneVehicleProcess, run: RunBeginOneVehicleProcess } = useRequest(() => beginOneVehicleProcess({
      vehicleProcessID: vehicleProcessID.value,
    }))

    const moveImg = ref([
      { id: '', label: '拍摄车牌', src: '', placeholder: '/static/img/move/front_outline.png' },
      { id: '', label: '拍摄后面', src: 'http://3onepicture.3onedataqz.com/eda7327a142c4bd5995a8e7be4c3fb3c.jpg', placeholder: '/static/img/move/back_outline.png' },
      { id: '', label: '拍摄侧面', src: '', placeholder: '/static/img/move/flank_outline.png' },
      { id: '', label: '拍摄前面', src: '', placeholder: '/static/img/move/front_outline.png' },
    ])

    return {
      vehicleProcessID,

      // 开始车辆处理
      BeginOneVehicleProcess,
      RunBeginOneVehicleProcess,

      moveImg,
    }
  },
  {
    persist: true,
  },
)
