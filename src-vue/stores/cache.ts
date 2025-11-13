// 应用缓存
import { defineStore } from 'pinia'
import {
  reactive,
  toRaw,
  watch,
} from 'vue'
import { useUserStore } from '@/stores/user'
import { RUN } from '~/lib/constant'

interface CacheState {
  sidebar: string | undefined
  feedId: number | undefined
  articleId: number | undefined
  theme: 'light' | 'dark' | 'system'
  glass: boolean
  bgImage: string
}

export const useCacheStore = defineStore('app-cache', () => {
  // 缓存数据
  const cache = reactive<CacheState>({
    sidebar: undefined,
    feedId: undefined,
    articleId: undefined,
    theme: 'system',
    glass: false,
    bgImage: 'https://cn.bing.com/th?id=OHR.TempleE_ZH-CN9455488333_UHD.jpg&pid=hp&w=2000',
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

  function setTheme(theme?: 'light' | 'dark' | 'system') {
    cache.theme = theme || (cache.theme === 'light' ? 'dark' : 'light')
    ipcRenderer.invoke(RUN.SET_NATIVE_THEME, cache.theme)
  }

  function setGlass(glass: boolean) {
    cache.glass = glass
  }

  function setBgImage(bgImage: string) {
    cache.bgImage = bgImage
  }

  watch(
    cache,
    (newVal) => {
      const userStore = useUserStore()
      if (userStore.user) {
        ipcRenderer.invoke(RUN.UPDATE_USER_BY_ID, userStore.user.id!, toRaw(newVal))
      }
    },
  )

  return {
    cache,
    setSidebar,
    setFeedId,
    setArticleId,
    setTheme,
    setGlass,
    setBgImage,
  }
})
