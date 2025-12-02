<template>
  <div class="layout-control-overlay" v-if="isVisible" @click="closeControl">
    <div class="layout-control" @click.stop>
      <div class="control-header">
        <h3>Layout Controls</h3>
      </div>
      <div class="control-body">
        <div class="control-group">
          <div class="control-item" @click="togglePanel('sidebar')">
            <div class="item-icon">
              <span :class="{ inactive: !panels.sidebar }">⬅️</span>
            </div>
            <div class="item-label">Side Bar</div>
            <div class="item-status">{{ panels.sidebar ? 'Visible' : 'Hidden' }}</div>
          </div>
          
          <div class="control-item" @click="togglePanel('panel')">
            <div class="item-icon">
              <span :class="{ inactive: !panels.panel }">⬇️</span>
            </div>
            <div class="item-label">Panel</div>
            <div class="item-status">{{ panels.panel ? 'Visible' : 'Hidden' }}</div>
          </div>
          
          <div class="control-item" @click="togglePanel('statusBar')">
            <div class="item-icon">
              <span :class="{ inactive: !panels.statusBar }">➖</span>
            </div>
            <div class="item-label">Status Bar</div>
            <div class="item-status">{{ panels.statusBar ? 'Visible' : 'Hidden' }}</div>
          </div>
          
          <div class="control-item" @click="togglePanel('activityBar')">
            <div class="item-icon">
              <span :class="{ inactive: !panels.activityBar }">📐</span>
            </div>
            <div class="item-label">Activity Bar</div>
            <div class="item-status">{{ panels.activityBar ? 'Visible' : 'Hidden' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const isVisible = ref(false)

// 面板状态管理
const panels = reactive({
  sidebar: true,
  panel: true,
  statusBar: true,
  activityBar: true
})

const openControl = () => {
  isVisible.value = true
}

const closeControl = () => {
  isVisible.value = false
}

const togglePanel = (panel: keyof typeof panels) => {
  panels[panel] = !panels[panel]
  // 触发事件通知其他组件面板状态变化
  window.dispatchEvent(new CustomEvent('layout-panel-toggle', {
    detail: { panel, visible: panels[panel] }
  }))
}

defineExpose({
  openControl
})
</script>

<style scoped>
.layout-control-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  z-index: 1000;
}

.layout-control {
  width: 300px;
  background-color: #333333;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.control-header {
  padding: 15px;
  border-bottom: 1px solid #3c3c3c;
  color: white;
}

.control-header h3 {
  margin: 0;
  font-size: 16px;
}

.control-body {
  padding: 10px;
}

.control-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.control-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.control-item:hover {
  background-color: #2a2d2e;
}

.item-icon {
  width: 24px;
  margin-right: 10px;
  font-size: 16px;
}

.item-icon .inactive {
  opacity: 0.4;
}

.item-label {
  flex-grow: 1;
  color: white;
  font-size: 13px;
}

.item-status {
  color: #888888;
  font-size: 12px;
}
</style>