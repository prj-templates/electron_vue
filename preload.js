const { contextBridge, ipcRenderer } = require('electron');

// Custom APIs for renderer
const api = {
  sendMessage: (message) => {
    ipcRenderer.send('message', message);
  },
  receiveMessage: (callback) => {
    ipcRenderer.on('receive-message', (_event, data) => callback(data));
  },
  minimizeWindow: () => {
    ipcRenderer.send('window-minimize');
  },
  maximizeWindow: () => {
    ipcRenderer.send('window-maximize');
  },
  closeWindow: () => {
    ipcRenderer.send('window-close');
  },
  unmaximizeWindow: () => {
    ipcRenderer.send('window-unmaximize');
  },
  isMaximized: () => {
    return ipcRenderer.invoke('window-is-maximized');
  }
};

// Use `contextBridge` APIs to expose Electron APIs to
// renderer process only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', api);
    contextBridge.exposeInMainWorld('api', {
      sendMessage: (message) => ipcRenderer.send('message', message),
      receiveMessage: (channel, func) => {
        const validChannels = ['receive-message'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender`
          ipcRenderer.on(channel, (_event, ...args) => func(...args));
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = api;
  // @ts-ignore (define in dts)
  window.api = {
    sendMessage: (message) => ipcRenderer.send('message', message),
    receiveMessage: (channel, func) => {
      const validChannels = ['receive-message'];
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (_event, ...args) => func(...args));
      }
    }
  };
}

module.exports = {};