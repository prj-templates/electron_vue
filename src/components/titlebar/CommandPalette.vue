<template>
  <div class="command-palette-overlay" v-if="isVisible" @click="closePalette">
    <div class="command-palette" @click.stop>
      <div class="palette-header">
        <input 
          type="text" 
          placeholder="Type a command" 
          v-model="searchQuery"
          ref="searchInput"
          @keydown="handleKeydown"
        />
      </div>
      <div class="palette-body">
        <div 
          v-for="(command, index) in filteredCommands" 
          :key="command.id"
          class="command-item"
          :class="{ active: activeIndex === index }"
          @click="executeCommand(command)"
        >
          <div class="command-icon">{{ command.icon }}</div>
          <div class="command-info">
            <div class="command-name">{{ command.name }}</div>
            <div class="command-description">{{ command.description }}</div>
          </div>
        </div>
        <div v-if="filteredCommands.length === 0" class="no-results">
          No commands found
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

interface Command {
  id: string
  name: string
  description: string
  icon: string
  action: () => void
}

const isVisible = ref(false)
const searchQuery = ref('')
const activeIndex = ref(0)
const searchInput = ref<HTMLInputElement | null>(null)

const commands = ref<Command[]>([
  {
    id: 'file-new',
    name: 'New File',
    description: 'Create a new file',
    icon: '📄',
    action: () => {
      console.log('New file command executed')
    }
  },
  {
    id: 'file-open',
    name: 'Open File',
    description: 'Open a file',
    icon: '📂',
    action: () => {
      console.log('Open file command executed')
    }
  },
  {
    id: 'view-toggle-sidebar',
    name: 'Toggle Sidebar',
    description: 'Show or hide the sidebar',
    icon: '⬅️',
    action: () => {
      console.log('Toggle sidebar command executed')
    }
  },
  {
    id: 'view-toggle-panel',
    name: 'Toggle Panel',
    description: 'Show or hide the panel',
    icon: '⬇️',
    action: () => {
      console.log('Toggle panel command executed')
    }
  },
  {
    id: 'theme-switch',
    name: 'Switch Theme',
    description: 'Switch between light and dark themes',
    icon: '🎨',
    action: () => {
      console.log('Switch theme command executed')
    }
  },
  {
    id: 'help-about',
    name: 'About',
    description: 'Show about information',
    icon: 'ℹ️',
    action: () => {
      console.log('About command executed')
    }
  }
])

const filteredCommands = computed(() => {
  if (!searchQuery.value) {
    return commands.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return commands.value.filter(cmd => 
    cmd.name.toLowerCase().includes(query) || 
    cmd.description.toLowerCase().includes(query)
  )
})

const openPalette = () => {
  isVisible.value = true
  searchQuery.value = ''
  activeIndex.value = 0
  
  // Focus the input after the component is rendered
  nextTick(() => {
    if (searchInput.value) {
      searchInput.value.focus()
    }
  })
}

const closePalette = () => {
  isVisible.value = false
}

const executeCommand = (command: Command) => {
  command.action()
  closePalette()
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closePalette()
  } else if (event.key === 'Enter') {
    if (filteredCommands.value.length > 0) {
      executeCommand(filteredCommands.value[activeIndex.value])
    }
  } else if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = activeIndex.value > 0 ? activeIndex.value - 1 : filteredCommands.value.length - 1
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = activeIndex.value < filteredCommands.value.length - 1 ? activeIndex.value + 1 : 0
  }
}

defineExpose({
  openPalette
})

watch(isVisible, (newVal) => {
  if (!newVal) {
    searchQuery.value = ''
  }
})
</script>

<style scoped>
.command-palette-overlay {
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

.command-palette {
  width: 600px;
  background-color: #333333;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

.palette-header {
  padding: 10px;
  border-bottom: 1px solid #3c3c3c;
}

.palette-header input {
  width: 100%;
  padding: 8px 12px;
  background-color: #3c3c3c;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  outline: none;
}

.palette-body {
  max-height: 300px;
  overflow-y: auto;
}

.command-item {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  cursor: pointer;
}

.command-item.active {
  background-color: #007acc;
}

.command-item:hover:not(.active) {
  background-color: #2a2d2e;
}

.command-icon {
  font-size: 16px;
  width: 24px;
  text-align: center;
  margin-right: 10px;
}

.command-info {
  flex-grow: 1;
}

.command-name {
  color: white;
  font-size: 13px;
  margin-bottom: 2px;
}

.command-description {
  color: #cccccc;
  font-size: 12px;
}

.no-results {
  padding: 20px;
  text-align: center;
  color: #888888;
  font-size: 14px;
}
</style>