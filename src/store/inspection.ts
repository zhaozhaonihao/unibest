import {
  beginOneRouteInstance,
  endOneRouteInstance,
  getRouteDefineList,
  getRouteInstanceDotList,
  getRouteInstanceList,
} from '@/service/static/inspection'

export const useInspection = defineStore(
  'inspection',
  () => {
    const { loginSession } = storeToRefs(useUserStore())

    const routeDefineID = ref<string>()

    // 路线定义
    const {
      data: RouteDefine,
      run: RunGetRouteDefineList,
    } = useRequest(() => getRouteDefineList())
    const routeDefine = computed(() => RouteDefine.value?.rows.map((i) => {
      return {
        label: i.name,
        value: i.routeDefineID,
      }
    }))
    const handleRouteDefine = ref<number | undefined>(undefined)
    const HandleRouteDefine = computed(() => routeDefine.value[handleRouteDefine.value])
    const UnLoadRouteDefine = () => {
      console.log('离开路线列表')

      RouteDefine.value = undefined
      handleRouteDefine.value = undefined
    }

    // 巡视实例
    const {
      data: RouteInstanceList,
      run: RunGetRouteInstanceList,
    } = useRequest(() => getRouteInstanceList({
      routeDefineID: HandleRouteDefine.value.value,
    }))
    const routeInstanceList = computed(() => RouteInstanceList.value?.rows.map((i) => {
      return {
        id: i.routeInstanceID,
        title: i.name,
        label: i.routeDefineName,
        value: i.employeeName,

        realBeginTime: i.realBeginTime,
        realBeginTimeStr: i.realBeginTimeStr,
        realEndTime: i.realEndTime,
        realEndTimeStr: i.realEndTimeStr,
      }
    }))
    const handleRouteInstance = ref<number | undefined>(undefined)
    const HandleRouteInstance = computed(() => routeInstanceList.value[handleRouteInstance.value])
    const UnLoadRouteInstance = () => {
      console.log('离开路线  =》 实例列表')

      RouteInstanceList.value = undefined
      handleRouteInstance.value = undefined
    }

    // 实例巡视点
    const {
      data: RouteInstanceDotList,
      run: RunGetRouteInstanceDotList,
    } = useRequest(() => getRouteInstanceDotList({
      memberID: loginSession.value.memberID,
      routeInstanceID: HandleRouteInstance.value.id,
    }))
    const routeInstanceDotList = computed(() => RouteInstanceDotList.value?.rows.map((i) => {
      return {
        id: i.routeInstanceID,
        name: i.name,
      }
    }))
    const handleRouteInstanceDot = ref<number | undefined>(undefined)
    const HandleRouteInstanceDot = computed(() => routeInstanceDotList.value[handleRouteInstanceDot.value])

    const UnLoadRouteInstanceDot = () => {
      console.log('离开路线  =》 实例  =》  检查点')
      RouteInstanceDotList.value = undefined
      handleRouteInstanceDot.value = undefined
    }

    // 开始巡视
    const {
      data: BeginOneRouteInstance,
      run: RunBeginOneRouteInstance,
    } = useRequest(() => beginOneRouteInstance({
      routeInstanceID: HandleRouteInstance.value.id,
    }))

    // 完成巡视
    const {
      data: EndOneRouteInstance,
      run: RunEndOneRouteInstance,
    } = useRequest(() => endOneRouteInstance({
      routeInstanceID: HandleRouteInstance.value.id,
    }))

    /**
     * 离开巡视页面
     * 清除 BeginOneRouteInstance 和 EndOneRouteInstance
     */
    const UnLoadOneRouteInstance = () => {
      BeginOneRouteInstance.value = undefined
      EndOneRouteInstance.value = undefined
    }

    return {
      routeDefineID,

      // 路线定义
      RouteDefine,
      routeDefine,
      RunGetRouteDefineList,
      handleRouteDefine,
      HandleRouteDefine,
      UnLoadRouteDefine,

      // 巡视实例
      RouteInstanceList,
      routeInstanceList,
      RunGetRouteInstanceList,
      handleRouteInstance,
      HandleRouteInstance,
      UnLoadRouteInstance,

      // 实例巡视点
      RouteInstanceDotList,
      routeInstanceDotList,
      RunGetRouteInstanceDotList,
      handleRouteInstanceDot,
      HandleRouteInstanceDot,
      UnLoadRouteInstanceDot,

      // 开始巡视
      BeginOneRouteInstance,
      RunBeginOneRouteInstance,
      // 结束巡视
      EndOneRouteInstance,
      RunEndOneRouteInstance,
      UnLoadOneRouteInstance,
    }
  },
  {
    persist: true,
  },
)

/**
    [Request]: /beginOneRouteInstance.json
    [Params]: {routeInstanceID: '53d30ea3aa8d49f5b3629c00b76494a5'}
    [Response 0]: {realBeginTime: '2025-02-28 10:37:48'}
 */
