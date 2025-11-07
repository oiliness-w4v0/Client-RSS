import type { UserSelect } from '../../src/db/schema'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCacheStore } from '@/stores/cache'
import { RUN } from '~/lib/constant'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserSelect[]>([])
  const user = ref<UserSelect | null>(null)

  /**
   * 添加用户
   * @param {string} email - 用户对象
   * @returns {void}
   */
  async function addUser(email: string): Promise<void> {
    await ipcRenderer.invoke(RUN.ADD_USER, email)
    // 添加成功后可以选择刷新用户列表
    getUsers()
  }

  /**
   * 获取用户列表
   * @returns {void}
   */
  async function getUsers(init?: boolean): Promise<void> {
    const data = await ipcRenderer.invoke(RUN.GET_ALL_USERS)
    const cacheStore = useCacheStore()
    if (data) {
      users.value = data
      const user = data[0]
      if (user) {
        setCurrentUser(user)
        if (init) {
          cacheStore.setSidebar(user?.profileInfo?.sidebar || 'articleList')
        }
      }
    }
  }

  /**
   * 设置当前用户
   * @param {UserSelect} selectedUser - 选择的用户对象
   * @returns {void}
   */
  function setCurrentUser(selectedUser: UserSelect): void {
    user.value = selectedUser
    const cacheStore = useCacheStore()
    cacheStore.setSidebar(selectedUser.sidebar)
    cacheStore.setFeedId(selectedUser.feedId)
    cacheStore.setArticleId(selectedUser.articleId)
  }

  return {
    user,
    users,
    addUser,
    getUsers,
    setCurrentUser,
  }
})
