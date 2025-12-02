<template>
  <div class="tab-bar">
    <div class="tabs-container">
      <div 
        v-for="(tab, index) in tabs" 
        :key="index"
        class="tab"
        :class="{ active: activeTab === index }"
        @click="setActiveTab(index)"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-title">{{ tab.title }}</span>
        <span class="tab-close" @click.stop="closeTab(index)">×</span>
      </div>
      <div class="new-tab" @click="addNewTab">
        <span>+</span>
      </div>
    </div>
    
    <div class="tab-content">
      <div v-if="tabs.length > 0" class="content-area">
        <h2>{{ tabs[activeTab]?.title }}</h2>
        <p>{{ tabs[activeTab]?.content }}</p>
        <div class="welcome-content" v-if="activeTab === 0 && tabs[0].title === 'Welcome'">
          <h1>Welcome to Electron Vue</h1>
          <p>This is a VS Code-like editor built with Electron and Vue 3.</p>
          <div class="features">
            <div class="feature-card">
              <h3>📁 File Explorer</h3>
              <p>Browse your project files</p>
            </div>
            <div class="feature-card">
              <h3>🎨 Theme Support</h3>
              <p>Customize your editor appearance</p>
            </div>
            <div class="feature-card">
              <h3>⚡ Fast Performance</h3>
              <p>Powered by Vite and Electron</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="empty-content">
        <p>No open editors</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

interface Tab {
  title: string
  content: string
  icon: string
}

const tabs = ref<Tab[]>([
  {
    title: 'Welcome',
    content: 'Welcome to the application!',
    icon: '🏠'
  },
  {
    title: 'App.vue',
    content: 'Main application component',
    icon: '📄'
  }
])

const activeTab = ref(0)

const setActiveTab = (index: number) => {
  activeTab.value = index
}

const closeTab = (index: number) => {
  tabs.value.splice(index, 1)
  
  // Adjust active tab if needed
  if (activeTab.value >= tabs.value.length && tabs.value.length > 0) {
    activeTab.value = tabs.value.length - 1
  } else if (tabs.value.length === 0) {
    activeTab.value = -1
  } else if (activeTab.value > index) {
    activeTab.value--
  }
}

const addNewTab = () => {
  const newTab: Tab = {
    title: `Untitled-${tabs.value.length + 1}`,
    content: `Content of untitled file ${tabs.value.length + 1}`,
    icon: '📄'
  }
  tabs.value.push(newTab)
  activeTab.value = tabs.value.length - 1
}
</script>

<style scoped>
.tab-bar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tabs-container {
  display: flex;
  background-color: #252526;
  border-bottom: 1px solid #1a1a1a;
  height: 35px;
  overflow-x: auto;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 10px;
  background-color: #2d2d2d;
  border-right: 1px solid #1a1a1a;
  cursor: pointer;
  font-size: 12px;
  min-width: 120px;
  position: relative;
}

.tab:hover {
  background-color: #3c3c3c;
}

.tab.active {
  background-color: #1e1e1e;
  border-top: 1px solid #007acc;
}

.tab-icon {
  margin-right: 5px;
}

.tab-title {
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tab-close {
  margin-left: 10px;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}

.tab-close:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.new-tab {
  display: flex;
  align-items: center;
  padding: 0 15px;
  background-color: #252526;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.new-tab:hover {
  background-color: #3c3c3c;
}

.tab-content {
  flex-grow: 1;
  background-color: #1e1e1e;
  overflow: auto;
}

.content-area {
  padding: 20px;
  color: #d4d4d4;
  height: 100%;
}

.content-area h2 {
  margin-top: 0;
  color: #cccccc;
}

.welcome-content h1 {
  color: #ffffff;
  text-align: center;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
  flex-wrap: wrap;
}

.feature-card {
  background-color: #2d2d30;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  padding: 20px;
  width: 200px;
  margin: 10px;
  text-align: center;
}

.feature-card h3 {
  margin-top: 0;
  color: #3794ff;
}

.empty-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888888;
  font-size: 14px;
}
</style>