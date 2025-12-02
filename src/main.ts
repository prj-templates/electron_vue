import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { themeManager } from './themes/themeManager'

// 初始化主题
themeManager.setCurrentTheme('dark')

// Check if we're in Electron environment
const isElectron = navigator.userAgent.indexOf('Electron') >= 0

// Handle Electron-specific logic
if (isElectron) {
  // Listen for messages from main process
  window.addEventListener('DOMContentLoaded', () => {
    // You can listen for messages from the main process
    // @ts-ignore
    if (window.api) {
      // @ts-ignore
      window.api.receiveMessage('receive-message', (data: any) => {
        console.log('Received from main process:', data)
      })
    }
  })
}

createApp(App).mount('#app')