// 应用缓存
import { defineStore } from 'pinia'
import { reactive, toRaw, watch } from 'vue'
import { useUserStore } from '@/stores/user'

interface CacheState {
  sidebar: string
  feedId: number | undefined
  articleId: number | undefined
}

export const useCacheStore = defineStore('app-cache', () => {
  // 缓存数据
  const cache = reactive<CacheState>({
    sidebar: 'moreSettings',
    feedId: undefined,
    articleId: undefined,
  })

  function setSidebar(sidebar: string) {
    cache.sidebar = sidebar
  }

  function setFeedId(feedId?: number) {
    cache.feedId = feedId
  }

  function setArticleId(articleId?: number) {
    cache.articleId = articleId
  }

  watch(
    cache,
    (newVal) => {
      const userStore = useUserStore()
      if (userStore.user) {
        console.log('缓存变化，更新用户的 profileInfo', newVal)
        window.ipcRenderer.updateProfileInfoByUserId(userStore.user.id!, toRaw(newVal))
      }
    },
  )

  // 更新缓存
  function updateCache() {
    // window.ipcRenderer.onUpdateCounter
  }

  return {
    cache,
    updateCache,
    setSidebar,
    setFeedId,
    setArticleId,
  }
})
