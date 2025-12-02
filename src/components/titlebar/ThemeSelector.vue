<template>
  <div class="theme-selector-overlay" v-if="isVisible" @click="closeSelector">
    <div class="theme-selector" @click.stop>
      <div class="selector-header">
        <h3>Select Theme</h3>
      </div>
      <div class="selector-body">
        <div 
          v-for="theme in themes" 
          :key="theme.id"
          class="theme-item"
          :class="{ active: currentTheme.id === theme.id }"
          @click="selectTheme(theme)"
        >
          <div class="theme-preview" :style="getPreviewStyle(theme)">
            <div class="preview-title-bar"></div>
            <div class="preview-content">
              <div class="preview-side-bar"></div>
              <div class="preview-editor"></div>
            </div>
          </div>
          <div class="theme-name">{{ theme.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { themes, themeManager, Theme } from '../../themes/themeManager'

const isVisible = ref(false)
const currentTheme = ref(themeManager.getCurrentTheme())

const openSelector = () => {
  isVisible.value = true
}

const closeSelector = () => {
  isVisible.value = false
}

const selectTheme = (theme: Theme) => {
  themeManager.setCurrentTheme(theme.id)
  currentTheme.value = theme
  closeSelector()
}

const getPreviewStyle = (theme: Theme) => {
  return {
    '--preview-title-bar': theme.colors.titleBarBackground,
    '--preview-side-bar': theme.colors.sideBarBackground,
    '--preview-editor': theme.colors.editorBackground
  }
}

defineExpose({
  openSelector
})

onMounted(() => {
  themeManager.subscribe((theme) => {
    currentTheme.value = theme
  })
})
</script>

<style scoped>
.theme-selector-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.theme-selector {
  width: 500px;
  background-color: #333333;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.selector-header {
  padding: 15px;
  border-bottom: 1px solid #3c3c3c;
  color: white;
}

.selector-header h3 {
  margin: 0;
  font-size: 16px;
}

.selector-body {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
}

.theme-item {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 10px;
}

.theme-item:hover {
  background-color: #2a2d2e;
}

.theme-item.active {
  background-color: #007acc;
}

.theme-preview {
  width: 120px;
  height: 80px;
  border: 1px solid #3c3c3c;
  border-radius: 3px;
  overflow: hidden;
  margin-right: 15px;
  background-color: var(--preview-editor);
}

.preview-title-bar {
  height: 20px;
  background-color: var(--preview-title-bar);
}

.preview-content {
  display: flex;
  height: 60px;
}

.preview-side-bar {
  width: 30px;
  background-color: var(--preview-side-bar);
}

.preview-editor {
  flex-grow: 1;
  background-color: var(--preview-editor);
}

.theme-name {
  color: white;
  font-size: 14px;
}
</style>