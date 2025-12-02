const { contextBridge, ipcRenderer } = require('electron');
const os = require('os');
const process = require('process');

// Custom APIs for renderer
const api = {
  sendMessage: (message) => {
    ipcRenderer.send('message', message);
  },
  receiveMessage: (callback) => {
    ipcRenderer.on('receive-message', (_event, data) => callback(data));
  }
};

// 窗口控制 API
const windowControlApi = {
  minimize: () => {
    console.log('Sending minimize command');
    ipcRenderer.send('window-control', 'minimize');
  },
  maximize: () => {
    console.log('Sending maximize command');
    ipcRenderer.send('window-control', 'maximize');
  },
  close: () => {
    console.log('Sending close command');
    ipcRenderer.send('window-control', 'close');
  }
};

// 扩展 API 以支持系统信息获取
const systemInfoApi = {
  // 获取基本系统信息
  getSystemInfo: () => ({
    platform: process.platform,
    arch: process.arch,
    hostname: os.hostname(),
    uptime: os.uptime(),
    type: os.type(),
    release: os.release(),
  }),

  // 获取 CPU 信息
  getCpuInfo: () => ({
    cores: os.cpus().length,
    model: os.cpus()[0].model,
    speed: os.cpus()[0].speed,
    loadAverage: os.loadavg()
  }),

  // 获取内存信息
  getMemoryInfo: () => ({
    total: os.totalmem(),
    free: os.freemem(),
    used: os.totalmem() - os.freemem()
  }),

  // 获取网络接口信息
  getNetworkInterfaces: () => os.networkInterfaces(),

  // 获取用户信息
  getUserInfo: () => ({
    homedir: os.homedir(),
    username: os.userInfo().username,
    uid: os.userInfo().uid,
    gid: os.userInfo().gid
  })
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
      },
      // 窗口控制 API
      window: windowControlApi,
      // 暴露系统信息 API 给渲染进程
      getSystemInfo: systemInfoApi.getSystemInfo,
      getCpuInfo: systemInfoApi.getCpuInfo,
      getMemoryInfo: systemInfoApi.getMemoryInfo,
      getNetworkInterfaces: systemInfoApi.getNetworkInterfaces,
      getUserInfo: systemInfoApi.getUserInfo
    });
    console.log('ContextBridge exposed successfully');
  } catch (error) {
    console.error('Error exposing context bridge:', error);
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
    },
    // 窗口控制 API
    window: windowControlApi,
    // 暴露系统信息 API 给渲染进程
    getSystemInfo: systemInfoApi.getSystemInfo,
    getCpuInfo: systemInfoApi.getCpuInfo,
    getMemoryInfo: systemInfoApi.getMemoryInfo,
    getNetworkInterfaces: systemInfoApi.getNetworkInterfaces,
    getUserInfo: systemInfoApi.getUserInfo
  };
  console.log('API attached to window object');
}

console.log('Preload script loaded');
module.exports = {};