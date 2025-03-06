import { getArticleSimpleDetail, getEmployeeList } from '@/service/static/other'

const InitLocationInfo: UniApp.GetLocationSuccess = {
  longitude: null,
  latitude: null,
  address: '',
  speed: 0,
  accuracy: 0,
  altitude: 0,
  verticalAccuracy: 0,
  horizontalAccuracy: 0,
}
export const useOtherStore = defineStore(
  'other',
  () => {
    const locationInfo = reactive(InitLocationInfo)
    // 获取位置
    const GetLocation = () => {
      console.log('GetLocation')

      uni.getLocation({
        success: (res) => {
          console.log('获取位置成功：', res)
          locationInfo.latitude = res.latitude
          locationInfo.longitude = res.longitude
          locationInfo.address = res.address
        },
        fail: (err) => {
          console.error('获取位置失败：', err)
        },
      })
    }

    // 文章详情
    const articleID = ref<string>('')
    const {
      data: ArticleDetail,
      run: RunGetArticleDetail,
    } = useRequest(() => getArticleSimpleDetail({
      articleID: articleID.value,
    }))

    // 公司成员
    const { data: EmployeeList, run: RunGetEmployeeList } = useRequest(() => getEmployeeList())
    const handleEmployee = ref<string | undefined>()
    const employeeList = computed(() => {
      return EmployeeList.value?.rows?.map((i) => {
        return {
          id: i.employeeID,
          name: i.name,

          label: i.name,
          value: i.employeeID,

          phone: i.phone,
        }
      }) || []
    })

    return {
      locationInfo,
      GetLocation,

      articleID,
      ArticleDetail,
      RunGetArticleDetail,

      EmployeeList,
      employeeList,
      RunGetEmployeeList,
      handleEmployee,

    }
  },
  {
    persist: true,
  },
)
