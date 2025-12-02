<template>
  <div class="main-layout">
    <TitleBar />
    
    <div class="main-content">
      <LeftSidebar ref="leftSidebarRef" />
      
      <div class="editor-area">
        <TabBar ref="tabBarRef" />
      </div>
      
      <RightSidebar ref="rightSidebarRef" />
    </div>
    
    <StatusBar />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TitleBar from '../components/titlebar/TitleBar.vue'
import LeftSidebar from '../components/sidebar/LeftSidebar.vue'
import RightSidebar from '../components/sidebar/RightSidebar.vue'
import StatusBar from '../components/statusbar/StatusBar.vue'
import TabBar from '../components/tabs/TabBar.vue'

const leftSidebarRef = ref<InstanceType<typeof LeftSidebar> | null>(null)
const rightSidebarRef = ref<InstanceType<typeof RightSidebar> | null>(null)
const tabBarRef = ref<InstanceType<typeof TabBar> | null>(null)

// 暴露方法给外部使用
defineExpose({
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
}

.editor-area {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>