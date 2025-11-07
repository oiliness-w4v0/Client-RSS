import { ipcMain } from 'electron'
import { RUN } from '~/lib/constant'
import {
  addSubscription,
  getSubscriptionsByUserId,
  removeSubscription,
} from './subscriptions.service'

// 根据用户 ID 查询订阅列表
ipcMain.handle(RUN.GET_SUBSCRIPTIONS_BY_USER_ID, async (event, userId: number) => {
  return await getSubscriptionsByUserId(userId)
})

// 在你发现这个订阅怎么都订阅不上的时候可以看一下你订阅的这个用户存在吗？
// 如果不存在的话订阅是不会成功的哦~
// 给用户添加订阅
ipcMain.handle(RUN.ADD_SUBSCRIPTION, async (event, userId: number, feedId: number) => {
  return await addSubscription(userId, feedId)
})

// 删除用户订阅
ipcMain.handle(RUN.REMOVE_SUBSCRIPTION, async (event, userId: number, feedId: number) => {
  return await removeSubscription(userId, feedId)
})
