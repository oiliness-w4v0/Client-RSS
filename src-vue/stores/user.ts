import type { User, UserSelect, UserWithProfileInfo } from '../../src/db/schema'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useCacheStore } from '@/stores/cache'

export const useUserStore = defineStore('user', () => {
  const users = ref<UserSelect[]>([])
  const user = ref<UserSelect | null>(null)

  /**
   * 添加用户
   * @param {UserSelect} user - 用户对象
   * @returns {void}
   */
  async function addUser(user: User): Promise<void> {
    return window.ipcRenderer.addUser(user).then((response) => {
      if (response.success) {
        // 添加成功后可以选择刷新用户列表
        getUsers()
      }
      else {
        console.error('Failed to add user:', response.error)
      }
    })
  }

  /**
   * 获取用户列表
   * @returns {void}
   */
  async function getUsers(init?: boolean): Promise<void> {
    const { success, data } = await window.ipcRenderer.getAllUsers()
    const cacheStore = useCacheStore()
    if (success && data) {
      console.log('获取用户列表成功', data)
      users.value = data

      const user = data[0]
      if (user) {
        console.log('设置当前用户为列表中的第一个用户', user)
        setCurrentUser(user)
        if (init) {
          console.log('初始化缓存中的侧边栏设置', user?.profileInfo?.sidebar)
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
  function setCurrentUser(selectedUser: UserWithProfileInfo): void {
    user.value = selectedUser
    // console.log('设置当前用户', selectedUser.profileInfo)
    if (selectedUser.profileInfo) {
      const cacheStore = useCacheStore()
      cacheStore.setSidebar(selectedUser.profileInfo.sidebar)
      cacheStore.setFeedId(selectedUser.profileInfo.feedId)
      cacheStore.setArticleId(selectedUser.profileInfo.articleId)
    }
  }

  return {
    user,
    users,
    addUser,
    getUsers,
    setCurrentUser,
  }
})
