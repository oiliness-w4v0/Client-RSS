import type { User, UserSelect } from '../../src/db/schema'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
  function getUsers(): void {
    window.ipcRenderer.getAllUsers().then((response) => {
      if (response.success && response.data) {
        users.value = response.data
        return response.data
      }
      else {
        console.error('Failed to fetch users:', response.error)
        return []
      }
    })
  }

  /**
   * 设置当前用户
   * @param {UserSelect} selectedUser - 选择的用户对象
   * @returns {void}
   */
  function setCurrentUser(selectedUser: UserSelect): void {
    user.value = selectedUser
  }

  return {
    user,
    users,
    addUser,
    getUsers,
    setCurrentUser,
  }
})
