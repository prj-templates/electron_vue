<template>
  <div class="main-layout">
    <TitleBar />
    
    <div class="main-content" :class="{ 'with-status-bar': layoutState.statusBar }">
      <LeftSidebar 
        ref="leftSidebarRef" 
        v-show="layoutState.sidebar"
      />
      
      <div class="editor-area">
        <TabBar ref="tabBarRef" />
      </div>
      
      <RightSidebar 
        ref="rightSidebarRef" 
        v-show="layoutState.panel"
      />
    </div>
    
    <StatusBar v-show="layoutState.statusBar" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import TitleBar from '../components/titlebar/TitleBar.vue'
import LeftSidebar from '../components/sidebar/LeftSidebar.vue'
import RightSidebar from '../components/sidebar/RightSidebar.vue'
import StatusBar from '../components/statusbar/StatusBar.vue'
import TabBar from '../components/tabs/TabBar.vue'

const leftSidebarRef = ref<InstanceType<typeof LeftSidebar> | null>(null)
const rightSidebarRef = ref<InstanceType<typeof RightSidebar> | null>(null)
const tabBarRef = ref<InstanceType<typeof TabBar> | null>(null)

// 布局状态管理
const layoutState = reactive({
  sidebar: true,
  panel: true,
  statusBar: true,
  activityBar: true
})

// 监听布局面板切换事件
const handleLayoutPanelToggle = (event: Event) => {
  const customEvent = event as CustomEvent
  const { panel, visible } = customEvent.detail
  layoutState[panel as keyof typeof layoutState] = visible
  
  // 特殊处理activityBar，控制左侧边栏工具栏的显示
  if (panel === 'activityBar') {
    if (leftSidebarRef.value) {
      const toolbar = leftSidebarRef.value.$el.querySelector('.sidebar-toolbar')
      if (toolbar) {
        toolbar.style.display = visible ? 'flex' : 'none'
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('layout-panel-toggle', handleLayoutPanelToggle as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('layout-panel-toggle', handleLayoutPanelToggle as EventListener)
})

// 暴露方法给外部使用
defineExpose({
  leftSidebarRef,
  rightSidebarRef
})
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  height: 100vh;
}

.main-content.with-status-bar {
  height: calc(100vh - 22px); /* 减去状态栏高度 */
}

.editor-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--side-bar-border, #252526);
}
</style>