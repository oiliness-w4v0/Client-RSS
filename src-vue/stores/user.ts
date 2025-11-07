import type {
  User,
  UserSelect,
  UserWithProfileInfo,
} from '../../src/db/schema'
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
    return ipcRenderer.invoke('add-user', user).then((response) => {
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
    const {
      success,
      data,
    } = await ipcRenderer.invoke('get-all-users')
    const cacheStore = useCacheStore()
    if (success && data) {
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
  function setCurrentUser(selectedUser: UserWithProfileInfo): void {
    user.value = selectedUser
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
