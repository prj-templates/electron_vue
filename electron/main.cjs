const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      // 启用Node.js集成，使预加载脚本可以使用Node.js模块
      nodeIntegrationInPreload: true,
      // 禁用沙盒以便预加载脚本可以访问Node.js API
      sandbox: false
    },
    // 启用窗口边缘吸附功能
    snap: true,
    // 移除默认菜单栏
    autoHideMenuBar: true,
    // 设置为桌面应用风格
    resizable: true,
    maximizable: true,
    minimizable: true,
    closable: true,
    fullscreenable: true,
    // 窗口背景色
    backgroundColor: '#36393F',
    // 移除原生标题栏
    frame: false
  });

  // Load the local URL in development, or the built file in production.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:5173');
    // 在开发模式下打开开发者工具
    // mainWindow.webContents.openDevTools({ mode: 'undocked' });
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }
  
  // 添加窗口事件监听器用于调试
  mainWindow.on('minimize', () => {
    console.log('Window minimized');
  });
  
  mainWindow.on('maximize', () => {
    console.log('Window maximized');
  });
  
  mainWindow.on('unmaximize', () => {
    console.log('Window unmaximized');
  });
  
  mainWindow.on('close', () => {
    console.log('Window closing');
  });
  
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log('App is ready');
  createWindow();
  console.log('Window created');

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 处理从渲染进程发送来的窗口控制消息
ipcMain.on('window-control', (event, action) => {
  console.log('Received window-control message:', action);
  if (!mainWindow) {
    console.log('No main window found');
    return;
  }
  
  switch (action) {
    case 'minimize':
      console.log('Minimizing window');
      mainWindow.minimize();
      break;
    case 'maximize':
      console.log('Toggling maximize state');
      if (mainWindow.isMaximized()) {
        console.log('Unmaximizing window');
        mainWindow.unmaximize();
      } else {
        console.log('Maximizing window');
        mainWindow.maximize();
      }
      break;
    case 'close':
      console.log('Closing window');
      mainWindow.close();
      break;
    default:
      console.log('Unknown window control action:', action);
  }
});

console.log('Main process loaded');