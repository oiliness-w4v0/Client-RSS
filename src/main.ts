import path from 'node:path'
import { app, BrowserWindow, shell } from 'electron'
import started from 'electron-squirrel-startup'
import cron from 'node-cron'
import { fatal, success } from 'signale'
import 'dotenv/config'
import './handlers'

if (started) {
  app.quit()
}

function createWindow() {
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

  win.loadURL(process.env.VITE_APP_FRONTEND_URL!).catch(fatal)

  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:'))
      shell.openExternal(url).catch(console.error)
    return { action: 'deny' }
  })

  cron.schedule('*/10 * * * * *', () => {
    win.webContents.send('update-counter', 1)
    success('running a task every minute')
  })

  win.webContents.openDevTools()
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
