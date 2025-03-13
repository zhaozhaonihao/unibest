import { getHotWordList } from '@/service/static/search'

export const useSearchStore = defineStore(
  'search',
  () => {
    // 历史记录
    const searchHistoryWordList = ref<string[]>([])

    const { data: HotWordData, run: RunGetHotWordList } = useRequest(() => getHotWordList())

    return {
      searchHistoryWordList,
      HotWordData,
      RunGetHotWordList,
    }
  },
  { persist: true },
)
