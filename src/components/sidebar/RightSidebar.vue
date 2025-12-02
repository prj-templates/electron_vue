<template>
  <div class="right-sidebar-wrapper">
    <div 
      class="right-sidebar" 
      :class="{ hidden: !isVisible }"
      :style="{ width: isVisible ? sidebarWidth + 'px' : 'auto' }"
    >
      <div class="sidebar-header">
        <div class="sidebar-title">Properties</div>
        <div class="sidebar-controls">
          <button class="toggle-btn" @click="toggleSidebar">×</button>
        </div>
      </div>
      <div class="sidebar-content">
        <div class="panel-section">
          <h3>Element Properties</h3>
          <div class="property-item">
            <label>Width:</label>
            <input type="text" value="100%" />
          </div>
          <div class="property-item">
            <label>Height:</label>
            <input type="text" value="auto" />
          </div>
          <div class="property-item">
            <label>Background:</label>
            <input type="text" value="#ffffff" />
          </div>
        </div>
        
        <div class="panel-section">
          <h3>Events</h3>
          <div class="event-item">
            <span>onClick</span>
          </div>
          <div class="event-item">
            <span>onHover</span>
          </div>
        </div>
      </div>
      
      <div 
        class="resize-handle" 
        @mousedown="startResizing"
      ></div>
    </div>
    
    <div class="sidebar-toggle" v-if="!isVisible" @click="openSidebar">
      <span>_PROPERTIES</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isVisible = ref(true)
const sidebarWidth = ref(250)

const toggleSidebar = () => {
  isVisible.value = !isVisible.value
}

const openSidebar = () => {
  isVisible.value = true
}

// 拖拽调整宽度功能
const startResizing = (e: MouseEvent) => {
  const startX = e.clientX
  const startWidth = sidebarWidth.value
  
  const doDrag = (e: MouseEvent) => {
    const newWidth = startWidth - (e.clientX - startX)
    // 限制最小宽度为150px，最大宽度为500px
    sidebarWidth.value = Math.max(150, Math.min(500, newWidth))
  }
  
  const stopDrag = () => {
    document.removeEventListener('mousemove', doDrag)
    document.removeEventListener('mouseup', stopDrag)
  }
  
  document.addEventListener('mousemove', doDrag)
  document.addEventListener('mouseup', stopDrag)
}

defineExpose({
  isVisible,
  openSidebar,
  toggleSidebar
})
</script>

<style scoped>
.right-sidebar-wrapper {
  display: flex;
  height: calc(100vh - 52px); /* 减去标题栏和状态栏高度 */
}

.right-sidebar {
  background-color: var(--side-bar-background);
  color: var(--side-bar-foreground);
  border-left: 1px solid var(--side-bar-border);
  border-right: 1px solid var(--side-bar-border);
  transition: transform 0.2s ease;
  display: flex;
  position: relative;
}

.right-sidebar.hidden {
  transform: translateX(100%);
}

.sidebar-header {
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid var(--side-bar-border);
  width: 100%;
}

.sidebar-title {
  font-size: 12px;
  font-weight: bold;
}

.toggle-btn {
  background: none;
  border: none;
  color: var(--side-bar-foreground);
  cursor: pointer;
  font-size: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.sidebar-content {
  padding: 10px;
  overflow-y: auto;
  flex-grow: 1;
}

.panel-section {
  margin-bottom: 15px;
}

.panel-section h3 {
  font-size: 11px;
  font-weight: normal;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  padding: 3px 0;
  color: #888888;
  border-bottom: 1px solid var(--side-bar-border);
}

.property-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 12px;
}

.property-item label {
  color: #888888;
}

.property-item input {
  background-color: var(--input-background);
  border: 1px solid var(--input-border);
  color: var(--input-foreground);
  padding: 2px 5px;
  width: 100px;
  font-size: 12px;
}

.event-item {
  padding: 3px 0;
  font-size: 12px;
  cursor: pointer;
}

.event-item:hover {
  background-color: #2a2d2e;
  padding-left: 5px;
}

.sidebar-toggle {
  width: 18px;
  background-color: var(--tool-bar-background);
  color: var(--side-bar-foreground);
  writing-mode: vertical-rl;
  text-orientation: mixed;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--side-bar-border);
  border-right: 1px solid var(--side-bar-border);
}

.sidebar-toggle:hover {
  background-color: #3c3c3c;
}

.resize-handle {
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background-color: transparent;
  cursor: col-resize;
  z-index: 100;
}

.resize-handle:hover {
  background-color: #007acc;
}
</style>