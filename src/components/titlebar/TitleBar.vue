<template>
  <div class="title-bar" @dblclick="toggleMaximize">
    <div class="title-bar-drag-region"></div>
    <div class="title-bar-content">
      <!-- 应用图标和菜单 -->
      <div class="title-bar-left">
        <div class="app-icon">
          <img v-if="appIcon" :src="appIcon" alt="App Icon" />
        </div>
        <div class="menu-item" @click="toggleMenu">
          <span>File</span>
        </div>
        <div class="menu-item">
          <span>Edit</span>
        </div>
        <div class="menu-item">
          <span>View</span>
        </div>
        <div class="menu-item">
          <span>Run</span>
        </div>
        <div class="menu-item">
          <span>Terminal</span>
        </div>
        <div class="menu-item">
          <span>Help</span>
        </div>
      </div>

      <!-- 中间标题区域 -->
      <div class="title-bar-center" @dblclick.stop>
        <span class="window-title">{{ title }}</span>
      </div>

      <!-- 右侧控制按钮 -->
      <div class="title-bar-right">
        <div class="command-palette" @click="openCommandPalette">
          <span>⌘ Palette</span>
        </div>
        <div class="theme-selector" @click="openThemeSelector">
          <span>Theme</span>
        </div>
        <div class="layout-selector" @click="toggleLayoutSelector">
          <span>Layout</span>
        </div>
        <div class="window-controls">
          <button class="minimize-btn" @click="minimizeWindow">─</button>
          <button class="maximize-btn" @click="toggleMaximize" @dblclick.stop>{{ isMaximized ? '❐' : '□' }}</button>
          <button class="close-btn" @click="closeWindow">×</button>
        </div>
      </div>
    </div>
    
    <CommandPalette ref="commandPaletteRef" />
    <ThemeSelector ref="themeSelectorRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CommandPalette from './CommandPalette.vue'
import ThemeSelector from './ThemeSelector.vue'
import { themeManager } from '../../themes/themeManager'

interface Props {
  title?: string
  appIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Electron Vue App',
  appIcon: ''
})

const commandPaletteRef = ref<InstanceType<typeof CommandPalette> | null>(null)
const themeSelectorRef = ref<InstanceType<typeof ThemeSelector> | null>(null)
const isMaximized = ref(false)

// 菜单相关功能
const toggleMenu = () => {
  console.log('Toggle menu')
}

// 命令面板
const openCommandPalette = () => {
  if (commandPaletteRef.value) {
    commandPaletteRef.value.openPalette()
  }
}

// 主题选择器
const openThemeSelector = () => {
  if (themeSelectorRef.value) {
    themeSelectorRef.value.openSelector()
  }
}

// 布局选择器
const toggleLayoutSelector = () => {
  console.log('Toggle layout selector')
}

// 窗口控制
const minimizeWindow = () => {
  if (window.electron) {
    window.electron.minimizeWindow()
  } else {
    console.log('Minimize window')
  }
}

const toggleMaximize = () => {
  if (window.electron) {
    window.electron.maximizeWindow()
  } else {
    console.log('Toggle maximize window')
  }
}

const closeWindow = () => {
  if (window.electron) {
    window.electron.closeWindow()
  } else {
    console.log('Close window')
  }
}

// 监听窗口状态变化
const handleWindowMaximized = () => {
  isMaximized.value = true
}

const handleWindowUnmaximized = () => {
  isMaximized.value = false
}

onMounted(() => {
  // 监听窗口最大化和取消最大化事件
  if (window.electron) {
    // 获取初始窗口状态
    window.electron.isMaximized().then((max: boolean) => {
      isMaximized.value = max
    })
  }
  
  // 监听窗口最大化和取消最大化事件
  window.addEventListener('window-maximized', handleWindowMaximized)
  window.addEventListener('window-unmaximized', handleWindowUnmaximized)
})

onUnmounted(() => {
  window.removeEventListener('window-maximized', handleWindowMaximized)
  window.removeEventListener('window-unmaximized', handleWindowUnmaximized)
})
</script>

<style scoped>
.title-bar {
  height: 30px;
  background-color: var(--title-bar-background, #3c3c3c);
  color: var(--title-bar-foreground, white);
  display: flex;
  align-items: center;
  position: relative;
  -webkit-app-region: drag;
  border-bottom: 1px solid var(--title-bar-border, #000000);
  user-select: none;
}

.title-bar-drag-region {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  -webkit-app-region: drag;
  z-index: -1;
}

.title-bar-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  -webkit-app-region: no-drag;
}

.title-bar-left {
  display: flex;
  align-items: center;
  height: 100%;
}

.app-icon {
  margin-right: 10px;
}

.app-icon img {
  height: 16px;
  width: 16px;
}

.menu-item {
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  -webkit-app-region: no-drag;
}

.menu-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.title-bar-center {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-app-region: drag;
  cursor: default;
}

.title-bar-right {
  display: flex;
  align-items: center;
  height: 100%;
}

.command-palette,
.theme-selector,
.layout-selector {
  padding: 0 8px;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 12px;
  -webkit-app-region: no-drag;
}

.command-palette:hover,
.theme-selector:hover,
.layout-selector:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.window-controls {
  display: flex;
  height: 100%;
}

.window-controls button {
  width: 30px;
  height: 100%;
  border: none;
  background: transparent;
  color: var(--title-bar-foreground, white);
  cursor: pointer;
  outline: none;
  font-size: 14px;
  -webkit-app-region: no-drag;
}

.window-controls button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.close-btn:hover {
  background-color: #e81123 !important;
}
</style>