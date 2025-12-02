import { contextBridge, ipcRenderer } from 'electron'

// Custom APIs for renderer
const api = {
  sendMessage: (message: string) => {
    ipcRenderer.send('message', message)
  },
  receiveMessage: (callback: (data: any) => void) => {
    ipcRenderer.on('receive-message', (_event, data) => callback(data))
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer process only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api)
    contextBridge.exposeInMainWorld('api', {
      sendMessage: (message: string) => ipcRenderer.send('message', message),
      receiveMessage: (channel: string, func: (...args: any[]) => void) => {
        const validChannels = ['receive-message'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (_event, ...args) => func(...args));
        }
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = api
  // @ts-ignore (define in dts)
  window.api = {
    sendMessage: (message: string) => ipcRenderer.send('message', message),
    receiveMessage: (channel: string, func: (...args: any[]) => void) => {
      const validChannels = ['receive-message'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    }
  }
}