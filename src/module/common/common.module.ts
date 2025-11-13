import {
  ipcMain,
  nativeTheme,
  Notification,
} from 'electron'
import { RUN } from '~/lib/constant'
import { sendMail } from './common.service'

// 设置原生主题
ipcMain.handle(RUN.SET_NATIVE_THEME, async (event, theme: 'dark' | 'light') => {
  console.log('设置主题为：', theme)
  nativeTheme.themeSource = theme
})

// 获取原生主题
ipcMain.handle(RUN.GET_NATIVE_THEME, async () => {
  return nativeTheme.shouldUseDarkColors ? 'dark' : 'light'
})

const NOTIFICATION_TITLE = '@油腻_w4v0 ~'
const NOTIFICATION_BODY
  = '发送给 18267094443@163.com 的邮件发送失败！请检查网络或邮箱地址是否正确。'

// 显示通知
function showNotification() {
  new Notification({
    title: NOTIFICATION_TITLE,
    body: NOTIFICATION_BODY,
  }).show()
}

// 发送邮件
ipcMain.handle(RUN.SEND_MAIL, async (event, to: string, html: string) => {
  try {
    await sendMail(to, html)
    return { success: true }
  }
  catch (error) {
    showNotification()
    return {
      success: false,
      error: (error as Error).message,
    }
  }
})
