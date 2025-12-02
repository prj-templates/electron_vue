<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SystemInfoView from './components/SystemInfoView.vue'
import ProcessManagerView from './components/ProcessManagerView.vue'
import NetworkView from './components/NetworkView.vue'
import DiskView from './components/DiskView.vue'
import SettingsView from './components/SettingsView.vue'

// 当前活动视图
const activeView = ref('system-info')
const isElectronEnv = ref(false)

// 导航菜单项
const menuItems = [
  { id: 'system-info', label: '系统信息', icon: '🖥️' },
  { id: 'process-manager', label: '进程管理', icon: '⚙️' },
  { id: 'network', label: '网络状态', icon: '🌐' },
  { id: 'disk', label: '磁盘信息', icon: '💾' },
  { id: 'settings', label: '设置', icon: '🔧' }
]

// 切换视图
const switchView = (viewId: string) => {
  activeView.value = viewId
}

// 窗口控制函数 - 简化API调用
const callWindowAPI = (method: string) => {
  console.log(`${method} button clicked`);
  // @ts-ignore
  if (window.api && window.api.window) {
    console.log(`Calling ${method} API`);
    // @ts-ignore
    window.api.window[method]()
  } else {
    console.log('Window API not available');
  }
}

const minimizeWindow = () => callWindowAPI('minimize')
const maximizeWindow = () => callWindowAPI('maximize')
const closeWindow = () => callWindowAPI('close')

onMounted(() => {
  // 检查是否在 Electron 环境中
  isElectronEnv.value = !!(window as any).navigator && (window as any).navigator.userAgent.indexOf('Electron') >= 0
  console.log('Is Electron environment:', isElectronEnv.value);
  
  if (isElectronEnv.value) {
    // @ts-ignore
    if (window.api) {
      console.log('API is available');
      // @ts-ignore
      window.api.receiveMessage('receive-message', (data: any) => {
        console.log('Received from main process:', data)
      })
    } else {
      console.log('API is not available');
    }
  }
})
</script>

<template>
  <div class="app-container">
    <!-- 自定义标题栏 -->
    <div class="titlebar" v-if="isElectronEnv">
      <div class="titlebar-drag-region"></div>
      <div class="titlebar-title">🛠️ 小工具箱</div>
      <div class="titlebar-controls">
        <button class="titlebar-button" @click="minimizeWindow">
          <span class="button-icon">─</span>
        </button>
        <button class="titlebar-button" @click="maximizeWindow">
          <span class="button-icon">□</span>
        </button>
        <button class="titlebar-button close" @click="closeWindow">
          <span class="button-icon">✕</span>
        </button>
      </div>
    </div>

    <div class="main-layout">
      <!-- 侧边栏 -->
      <aside class="sidebar">
        <div class="app-header">
          <h1>🛠️ 小工具箱</h1>
        </div>
        <nav class="menu">
          <button 
            v-for="item in menuItems" 
            :key="item.id"
            :class="{ active: activeView === item.id }"
            @click="switchView(item.id)"
            class="menu-item"
          >
            <span class="icon">{{ item.icon }}</span>
            <span class="label">{{ item.label }}</span>
          </button>
        </nav>
      </aside>

      <!-- 主内容区 -->
      <main class="main-content">
        <SystemInfoView v-if="activeView === 'system-info'" />
        <ProcessManagerView v-else-if="activeView === 'process-manager'" />
        <NetworkView v-else-if="activeView === 'network'" />
        <DiskView v-else-if="activeView === 'disk'" />
        <SettingsView v-else-if="activeView === 'settings'" />
      </main>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
}

.titlebar {
  display: flex;
  height: 30px;
  background: #2c3e50;
  color: white;
  user-select: none;
  position: relative;
}

.titlebar-drag-region {
  position: absolute;
  top: 0;
  left: 0;
  right: 138px; /* 控制按钮宽度总和 */
  height: 100%;
  -webkit-app-region: drag;
}

.titlebar-title {
  flex: 1;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.titlebar-controls {
  display: flex;
  height: 100%;
  -webkit-app-region: no-drag;
}

.titlebar-button {
  width: 46px;
  height: 100%;
  background: transparent;
  border: none;
  color: white;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.titlebar-button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.titlebar-button.close:hover {
  background: #e81123;
}

.button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.sidebar {
  width: 220px;
  background: linear-gradient(180deg, #2c3e50, #1a2530);
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  flex-shrink: 0;
}

.app-header {
  padding: 20px;
  border-bottom: 1px solid #34495e;
}

.app-header h1 {
  margin: 0;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu {
  flex: 1;
  padding: 10px 0;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
  border: none;
  background: transparent;
  color: #ecf0f1;
  cursor: pointer;
  text-align: left;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background: rgba(52, 73, 94, 0.7);
}

.menu-item.active {
  background: #3498db;
  border-left: 4px solid #f1c40f;
}

.icon {
  font-size: 1.2rem;
  margin-right: 12px;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  background: #f5f7fa;
  padding: 20px;
}
</style>