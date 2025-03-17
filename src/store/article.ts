import type { GetArticleType } from '@/service/static/article'
import { getArticleList, getArticleSimpleDetail } from '@/service/static/article'

export const useArticleStore = defineStore(
  'article',
  () => {
    const articleParams = ref<Partial<GetArticleType> | undefined>()
    const {
      data: ArticleList,
      run: RunGetArticleList,
    } = useRequest(() => getArticleList(articleParams.value))
    const articleList = computed(() => {
      return ArticleList.value?.rows.map((i) => {
        return {
          id: i.articleID,
          name: i.name,

          src: i.faceImage,
          title: i.title,
          desc: i.description,
          time: i.beginDateStr,

          content: i.content,
        }
      }) || []
    })

    const articleID = ref<string | undefined>()
    const {
      data: ArticleDetail,
      run: RunGetArticleDetail,
    } = useRequest(() => getArticleSimpleDetail(articleID.value))

    return {

      ArticleList,
      articleList,
      RunGetArticleList,
      articleParams,

      articleID,
      ArticleDetail,
      RunGetArticleDetail,
    }
  },
  { persist: true },
)
