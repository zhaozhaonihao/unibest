import { getParkAreaList, getParkUnitList, getVehicleProcessList } from '@/service/static/move'

export const useMoveStore = defineStore(
  'move',
  () => {
    const { OneMemberDetail } = storeToRefs(useUserStore())

    // 停车区
    const {
      data: ParkAreaList,
      run: RunGetParkAreaList,
    } = useRequest(() => getParkAreaList(OneMemberDetail.value.phone))
    const parkAreaList = computed(() => ParkAreaList.value?.rows.map((i) => {
      return {
        id: i.parkAreaID,
        name: i.name,

        value: i.parkAreaID,
        label: i.name,
      }
    }))
    const handleParkArea = ref<string | undefined>(undefined)
    const HandelParkArea = computed(() => parkAreaList.value.find(i => i.id === handleParkArea.value))

    // 停车单元
    const {
      data: ParkUnitList,
      run: RunGetParkUnitList,
    } = useRequest(() => getParkUnitList(HandelParkArea.value.id))
    const parkUnitList = computed(() => ParkUnitList.value?.rows.map(i => i))
    const handleParkUnit = ref<number | undefined>(undefined)
    const HandelParkUnit = computed(() => parkUnitList.value[handleParkUnit.value])

    // 车辆处理记录
    const {
      data: VehicleProcessList,
      run: RunGetVehicleProcessList,
    } = useRequest(() => getVehicleProcessList())
    const vehicleProcessList = computed(() => VehicleProcessList.value?.rows.map(i => i))
    const handleVehicleProcess = ref<number | undefined>(undefined)
    const HandelVehicleProcess = computed(() => vehicleProcessList.value[handleVehicleProcess.value])

    // 车辆处理记录
    const OneVehicleProcess = ref()
    const oneVehicleProcess = computed(() => OneVehicleProcess.value?.rows.map(i => i))
    const handleOneVehicleProcess = ref<number | undefined>(undefined)
    const HandelOneVehicleProcess = computed(() => oneVehicleProcess.value[handleOneVehicleProcess.value])

    return {
      // 停车区
      ParkAreaList,
      parkAreaList,
      RunGetParkAreaList,
      handleParkArea,
      HandelParkArea,

      // 停车单元
      ParkUnitList,
      parkUnitList,
      RunGetParkUnitList,
      handleParkUnit,
      HandelParkUnit,

      // 车辆处理记录
      VehicleProcessList,
      vehicleProcessList,
      RunGetVehicleProcessList,
      handleVehicleProcess,
      HandelVehicleProcess,

      // 车辆处理记录
      OneVehicleProcess,
      oneVehicleProcess,
      handleOneVehicleProcess,
      HandelOneVehicleProcess,

    }
  },
  {
    persist: true,
  },
)
