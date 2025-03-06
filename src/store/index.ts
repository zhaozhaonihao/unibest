import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate' // 数据持久化

const store = createPinia()
store.use(
  createPersistedState({
    key: id => `${import.meta.env.VITE_APP_TITLE}__${id}`,

    storage: {
      getItem: uni.getStorageSync,
      setItem: uni.setStorageSync,
    },
  }),
)

export default store

export * from './inspection'
export * from './other'
export * from './user'
