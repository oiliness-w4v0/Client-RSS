import type { User } from '~/db/schema'
import { ipcMain } from 'electron'
import { RUN } from '~/lib/constant'
import {
  addUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './user.service'

/**
 * 添加用户
 */
ipcMain.handle(RUN.ADD_USER, async (event, email: string) => {
  await addUser(email)
})

/**
 * 获取所有用户
 */
ipcMain.handle(RUN.GET_ALL_USERS, async () => {
  // 获取所有用户
  const users = await getAllUsers()
  return users
})

/**
 * 根据 ID 更新用户
 */
ipcMain.handle(RUN.UPDATE_USER_BY_ID, async (event, id: number, user: Partial<User>) => {
  await updateUser(id, user)
})

/**
 * 根据 ID 获取用户
 */
ipcMain.handle(RUN.GET_USER_BY_ID, async (event, id: number) => {
  const user = await getUserById(id)
  return user
})
