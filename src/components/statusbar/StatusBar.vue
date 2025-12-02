<template>
  <div class="status-bar">
    <div class="status-left">
      <div class="status-item" @click="showNotifications">
        <span>🔔</span>
        <span>0</span>
      </div>
      <div class="status-item" @click="showBranchInfo">
        <span>⎇</span>
        <span>main</span>
      </div>
      <div class="status-item" @click="showSyncStatus">
        <span>⇅</span>
        <span>Sync</span>
      </div>
    </div>
    
    <div class="status-center">
      <div class="status-item">
        <span>Line 1, Column 1</span>
      </div>
    </div>
    
    <div class="status-right">
      <div class="status-item" @click="changeEncoding">
        <span>UTF-8</span>
      </div>
      <div class="status-item" @click="changeLanguage">
        <span>TypeScript</span>
      </div>
      <div class="status-item" @click="changeLineEnding">
        <span>CRLF</span>
      </div>
      <div class="status-item" @click="toggleFullScreen">
        <span>☐</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { themeManager } from '../../themes/themeManager'

const showNotifications = () => {
  console.log('Show notifications')
}

const showBranchInfo = () => {
  console.log('Show branch info')
}

const showSyncStatus = () => {
  console.log('Show sync status')
}

const changeEncoding = () => {
  console.log('Change encoding')
}

const changeLanguage = () => {
  console.log('Change language')
}

const changeLineEnding = () => {
  console.log('Change line ending')
}

const toggleFullScreen = () => {
  console.log('Toggle full screen')
}

// 监听主题变化并应用到状态栏
onMounted(() => {
  themeManager.subscribe((theme) => {
    const root = document.documentElement;
    root.style.setProperty('--status-bar-background', theme.colors.statusBarBackground);
    root.style.setProperty('--status-bar-foreground', theme.colors.statusBarForeground);
  });
})
</script>

<style scoped>
.status-bar {
  height: 22px;
  background-color: var(--status-bar-background, #007acc);
  color: var(--status-bar-foreground, white);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding: 0 10px;
}

.status-left,
.status-center,
.status-right {
  display: flex;
  height: 100%;
}

.status-item {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  cursor: pointer;
}

.status-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.status-left .status-item {
  border-right: 1px solid rgba(255, 255, 255, 0.2);
}

.status-right .status-item {
  border-left: 1px solid rgba(255, 255, 255, 0.2);
}

.status-center .status-item {
  padding: 0 15px;
}
</style>