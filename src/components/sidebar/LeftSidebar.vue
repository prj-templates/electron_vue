<template>
  <div class="left-sidebar" :class="{ collapsed: isCollapsed }">
    <div class="sidebar-toolbar">
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'explorer' }"
        @click="setActivePanel('explorer')"
        title="Explorer"
      >
        <span>📁</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'search' }"
        @click="setActivePanel('search')"
        title="Search"
      >
        <span>🔍</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'git' }"
        @click="setActivePanel('git')"
        title="Git"
      >
        <span>⎇</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'debug' }"
        @click="setActivePanel('debug')"
        title="Debug"
      >
        <span>🐞</span>
      </div>
      <div 
        class="toolbar-item" 
        :class="{ active: activePanel === 'extensions' }"
        @click="setActivePanel('extensions')"
        title="Extensions"
      >
        <span>🧩</span>
      </div>
    </div>
    
    <div class="sidebar-content-wrapper" v-show="!isCollapsed">
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
    
    <div class="sidebar-toggle" @click="toggleSidebar" v-show="!isCollapsed">
      <span>◀</span>
    </div>
    <div class="sidebar-toggle-collapsed" @click="toggleSidebar" v-show="isCollapsed">
      <span>▶</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)
const activePanel = ref('explorer')

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const setActivePanel = (panel: string) => {
  // 如果侧边栏已折叠，点击图标时展开侧边栏
  if (isCollapsed.value) {
    isCollapsed.value = false
  }
  activePanel.value = panel
}
</script>

<style scoped>
.left-sidebar {
  height: calc(100vh - 52px); /* 减去标题栏和状态栏高度 */
  background-color: #333333;
  color: #cccccc;
  transition: width 0.2s ease;
  overflow: hidden;
  border-right: 1px solid #252526;
  display: flex;
}

.left-sidebar.collapsed {
  width: 40px;
}

.sidebar-toolbar {
  width: 40px;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
  border-right: 1px solid #252526;
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
}

.sidebar-content {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

.sidebar-toggle {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 15px;
  height: 30px;
  background-color: #333333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

.sidebar-toggle-collapsed {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
  background-color: #3c3c3c;
  border: 1px solid #3c3c3c;
  color: #cccccc;
  border-radius: 3px;
}

.search-result-item {
  padding: 5px 0;
  border-bottom: 1px solid #3c3c3c;
}

.result-path {
  font-size: 11px;
  color: #888888;
}

.result-preview {
  font-size: 12px;
  color: #cccccc;
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
  border-bottom: 1px solid #3c3c3c;
}

.extension-name {
  font-size: 13px;
  color: #cccccc;
}

.extension-version {
  font-size: 11px;
  color: #888888;
}
</style>