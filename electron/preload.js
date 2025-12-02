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
    
    // 监听主进程发送的窗口事件并转发给渲染进程
    ipcRenderer.on('window-maximized', () => {
      const event = new CustomEvent('window-maximized');
      window.dispatchEvent(event);
    });
    
    ipcRenderer.on('window-unmaximized', () => {
      const event = new CustomEvent('window-unmaximized');
      window.dispatchEvent(event);
    });
    
    ipcRenderer.on('window-enter-fullscreen', () => {
      const event = new CustomEvent('window-enter-fullscreen');
      window.dispatchEvent(event);
    });
    
    ipcRenderer.on('window-leave-fullscreen', () => {
      const event = new CustomEvent('window-leave-fullscreen');
      window.dispatchEvent(event);
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
  
  // 监听主进程发送的窗口事件并转发给渲染进程
  ipcRenderer.on('window-maximized', () => {
    const event = new CustomEvent('window-maximized');
    window.dispatchEvent(event);
  });
  
  ipcRenderer.on('window-unmaximized', () => {
    const event = new CustomEvent('window-unmaximized');
    window.dispatchEvent(event);
  });
  
  ipcRenderer.on('window-enter-fullscreen', () => {
    const event = new CustomEvent('window-enter-fullscreen');
    window.dispatchEvent(event);
  });
  
  ipcRenderer.on('window-leave-fullscreen', () => {
    const event = new CustomEvent('window-leave-fullscreen');
    window.dispatchEvent(event);
  });
}

module.exports = {};