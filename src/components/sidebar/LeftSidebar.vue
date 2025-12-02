<template>
  <div 
    class="left-sidebar" 
    :class="{ collapsed: isCollapsed }"
    :style="{ width: isCollapsed ? '40px' : sidebarWidth + 'px' }"
  >
    <div class="sidebar-toolbar">
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'explorer' }"
        @click="togglePanel('explorer')"
        title="Explorer"
      >
        <span>📁</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'search' }"
        @click="togglePanel('search')"
        title="Search"
      >
        <span>🔍</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'git' }"
        @click="togglePanel('git')"
        title="Git"
      >
        <span>⎇</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'debug' }"
        @click="togglePanel('debug')"
        title="Debug"
      >
        <span>🐞</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'extensions' }"
        @click="togglePanel('extensions')"
        title="Extensions"
      >
        <span>🧩</span>
      </div>
    </div>
    
    <div 
      class="sidebar-content-wrapper" 
      v-show="!isCollapsed"
    >
      <div class="sidebar-content" v-show="activePanel === 'explorer'">
        <div class="sidebar-section">
          <h3>Explorer</h3>
          <ul class="sidebar-list">
            <li class="sidebar-item">
              <span class="item-icon">📁</span>
              <span class="item-text">Project</span>
            </li>
            <li class="sidebar-item">
              <span class="item-icon">📄</span>
              <span class="item-text">App.vue</span>
            </li>
            <li class="sidebar-item">
              <span class="item-icon">📁</span>
              <span class="item-text">src</span>
            </li>
            <li class="sidebar-item indent">
              <span class="item-icon">📄</span>
              <span class="item-text">main.ts</span>
            </li>
            <li class="sidebar-item indent">
              <span class="item-icon">📄</span>
              <span class="item-text">App.vue</span>
            </li>
            <li class="sidebar-item indent">
              <span class="item-icon">📄</span>
              <span class="item-text">style.css</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="sidebar-content" v-show="activePanel === 'search'">
        <div class="sidebar-section">
          <h3>Search</h3>
          <div class="search-input-container">
            <input type="text" placeholder="Search" class="search-input" />
          </div>
          <div class="search-results">
            <div class="search-result-item">
              <span class="result-path">src/App.vue:15</span>
              <div class="result-preview">Main application component</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sidebar-content" v-show="activePanel === 'git'">
        <div class="sidebar-section">
          <h3>Git</h3>
          <div class="git-status">
            <div class="status-item">
              <span class="status-icon">➕</span>
              <span class="status-text">New file</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="sidebar-content" v-show="activePanel === 'debug'">
        <div class="sidebar-section">
          <h3>Debug</h3>
          <div class="debug-actions">
            <button class="debug-button">Start Debugging</button>
          </div>
        </div>
      </div>
      
      <div class="sidebar-content" v-show="activePanel === 'extensions'">
        <div class="sidebar-section">
          <h3>Extensions</h3>
          <div class="extension-item">
            <div class="extension-name">Vue Language Features</div>
            <div class="extension-version">v1.8.27</div>
          </div>
        </div>
      </div>
    </div>
    
    <div 
      class="resize-handle" 
      v-show="!isCollapsed"
      @mousedown="startResizing"
    ></div>
    
    <div 
      class="sidebar-toggle" 
      @click="toggleSidebar"
      v-show="!isCollapsed"
    >
      <span class="toggle-icon">◀</span>
    </div>
    <div 
      class="sidebar-toggle-collapsed" 
      @click="toggleSidebar"
      v-show="isCollapsed"
    >
      <span class="toggle-icon">▶</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)
const activePanel = ref('explorer')
const sidebarWidth = ref(250)
const isResizing = ref(false)

// 切换面板显示/隐藏
const togglePanel = (panel: string) => {
  if (isCollapsed.value) {
    // 如果侧边栏已折叠，点击图标时展开侧边栏并显示对应面板
    isCollapsed.value = false
    activePanel.value = panel
  } else {
    // 如果侧边栏已展开
    if (activePanel.value === panel) {
      // 点击当前面板则隐藏侧边栏
      isCollapsed.value = true
    } else {
      // 点击其他面板则切换到该面板
      activePanel.value = panel
    }
  }
}

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

// 拖拽调整宽度功能
const startResizing = (e: MouseEvent) => {
  isResizing.value = true
  const startX = e.clientX
  const startWidth = sidebarWidth.value
  
  const doDrag = (e: MouseEvent) => {
    const newWidth = startWidth + e.clientX - startX
    // 限制最小宽度为150px，最大宽度为500px
    sidebarWidth.value = Math.max(150, Math.min(500, newWidth))
  }
  
  const stopDrag = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', doDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
  
  document.addEventListener('mousemove', doDrag)
  document.addEventListener('mouseup', stopDrag)
}

// 暴露方法供外部调用
defineExpose({
  togglePanel,
  isCollapsed
})
</script>

<style scoped>
.left-sidebar {
  height: calc(100vh - 52px); /* 减去标题栏和状态栏高度 */
  background-color: var(--side-bar-background);
  color: var(--side-bar-foreground);
  transition: width 0.2s ease;
  overflow: hidden;
  border-right: 1px solid var(--side-bar-border);
  display: flex;
  position: relative;
}

.sidebar-toolbar {
  width: 40px;
  background-color: var(--tool-bar-background);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border-right: 1px solid var(--side-bar-border);
  flex-shrink: 0;
}

.toolbar-item {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 5px;
  font-size: 16px;
}

.toolbar-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.toolbar-item.active {
  background-color: #007acc;
}

.sidebar-content-wrapper {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.sidebar-content {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
  width: 100%;
}

.resize-handle {
  position: absolute;
  top: 0;
  right: 0;
  width: 5px;
  height: 100%;
  background-color: transparent;
  cursor: col-resize;
  z-index: 100;
}

.resize-handle:hover {
  background-color: #007acc;
}

.sidebar-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 30px;
  background-color: var(--side-bar-background);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  z-index: 10;
}

.sidebar-toggle-collapsed {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.toggle-icon {
  font-size: 12px;
  color: #888888;
}

.sidebar-toggle:hover .toggle-icon,
.sidebar-toggle-collapsed:hover .toggle-icon {
  color: #ffffff;
}

.sidebar-section {
  margin-bottom: 15px;
}

.sidebar-section h3 {
  font-size: 11px;
  font-weight: normal;
  text-transform: uppercase;
  margin: 0 0 5px 0;
  padding: 5px 0;
  color: #888888;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 3px 5px;
  cursor: pointer;
  border-radius: 3px;
  font-size: 13px;
}

.sidebar-item.indent {
  margin-left: 15px;
}

.sidebar-item:hover {
  background-color: #2a2d2e;
}

.item-icon {
  margin-right: 5px;
  width: 16px;
  text-align: center;
}

.search-input-container {
  margin-bottom: 10px;
}

.search-input {
  width: 100%;
  padding: 5px;
  background-color: var(--input-background);
  border: 1px solid var(--input-border);
  color: var(--input-foreground);
  border-radius: 3px;
}

.search-result-item {
  padding: 5px 0;
  border-bottom: 1px solid var(--side-bar-border);
}

.result-path {
  font-size: 11px;
  color: #888888;
}

.result-preview {
  font-size: 12px;
  color: var(--side-bar-foreground);
}

.debug-button {
  width: 100%;
  padding: 5px;
  background-color: #007acc;
  border: none;
  color: white;
  border-radius: 3px;
  cursor: pointer;
}

.extension-item {
  padding: 5px 0;
  border-bottom: 1px solid var(--side-bar-border);
}

.extension-name {
  font-size: 13px;
  color: var(--side-bar-foreground);
}

.extension-version {
  font-size: 11px;
  color: #888888;
}
</style>