import { app, BrowserWindow } from 'electron'
import path from 'node:path'

// The built directory path
const DIST = path.join(__dirname, '../dist')
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL

let win: BrowserWindow | null = null
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const preload = path.join(__dirname, 'index.js')

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // Consider using contextBridge.exposeInMainWorld to expose APIs to the renderer process
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadURL(`file://${path.join(DIST, 'index.html')}`)
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.whenReady().then(createWindow)

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})