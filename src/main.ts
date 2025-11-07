import path from 'node:path'
import {
  app,
  BrowserWindow,
  shell,
} from 'electron'
import started from 'electron-squirrel-startup'
import cron from 'node-cron'
import { fatal } from 'signale'
import { runMigrations } from './db/db'

import { addUser } from './module/user'
import './module'

if (started) {
  app.quit()
}

async function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 850,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      preload: path.join(__dirname, '../dist/preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })
  // 执行迁移
  await runMigrations()
  // 初始化默认用户
  await addUser('18267094443@163.com')

  if (app.isPackaged) {
    win.loadFile('./dist/index.html').catch(console.error)
  }
  else {
    win.loadURL(process.env.VITE_APP_FRONTEND_URL!).catch(fatal)
    win.webContents.openDevTools()
  }

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:'))
      shell.openExternal(url).catch(console.error)
    return { action: 'deny' }
  })

  cron.schedule('*/10 * * * * *', () => {
    // win.webContents.send('update-counter', 1)
    // success('running a task every minute')
  })

  // win.webContents.openDevTools()
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
