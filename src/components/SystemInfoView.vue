<template>
  <div class="system-info-view">
    <h2>🖥️ 系统信息</h2>
    
    <div class="info-section">
      <h3>基本信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">操作系统:</span>
          <span class="info-value">{{ systemInfo.os }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">系统版本:</span>
          <span class="info-value">{{ systemInfo.version }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">主机名:</span>
          <span class="info-value">{{ systemInfo.hostname }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">架构:</span>
          <span class="info-value">{{ systemInfo.architecture }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">运行时间:</span>
          <span class="info-value">{{ formatUptime(systemInfo.uptime) }}</span>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>处理器</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">型号:</span>
          <span class="info-value">{{ cpuInfo.model }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">核心数:</span>
          <span class="info-value">{{ cpuInfo.cores }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">频率:</span>
          <span class="info-value">{{ cpuInfo.speed }} MHz</span>
        </div>
      </div>
    </div>

    <div class="info-section">
      <h3>内存</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">总内存:</span>
          <span class="info-value">{{ formatBytes(memoryInfo.total) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">已使用:</span>
          <span class="info-value">{{ formatBytes(memoryInfo.used) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">可用内存:</span>
          <span class="info-value">{{ formatBytes(memoryInfo.free) }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">使用率:</span>
          <span class="info-value">{{ memoryInfo.percentage }}%</span>
        </div>
      </div>
      
      <div class="memory-bar">
        <div 
          class="memory-fill" 
          :style="{ width: memoryInfo.percentage + '%' }"
        ></div>
      </div>
    </div>

    <div class="info-section">
      <h3>用户信息</h3>
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">用户名:</span>
          <span class="info-value">{{ userInfo.username }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">主目录:</span>
          <span class="info-value">{{ userInfo.homedir }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 定义响应式数据
const systemInfo = ref({
  os: '未知',
  version: '未知',
  hostname: '未知',
  architecture: '未知',
  uptime: 0
});

const cpuInfo = ref({
  model: '未知',
  cores: 0,
  speed: 0
});

const memoryInfo = ref({
  total: 0,
  used: 0,
  free: 0,
  percentage: 0
});

const userInfo = ref({
  username: '未知',
  homedir: '未知'
});

// 格式化运行时间
const formatUptime = (seconds: number) => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${days}天 ${hours}小时 ${minutes}分钟`;
};

// 格式化字节大小
const formatBytes = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 获取系统信息
const fetchSystemInfo = async () => {
  try {
    // 检查是否在 Electron 环境中
    if (typeof window !== 'undefined' && (window as any).api) {
      // @ts-ignore
      const sysInfo = window.api.getSystemInfo ? await window.api.getSystemInfo() : null;
      // @ts-ignore
      const cpu = window.api.getCpuInfo ? await window.api.getCpuInfo() : null;
      // @ts-ignore
      const mem = window.api.getMemoryInfo ? await window.api.getMemoryInfo() : null;
      // @ts-ignore
      const user = window.api.getUserInfo ? await window.api.getUserInfo() : null;

      if (sysInfo) {
        systemInfo.value = {
          os: sysInfo.type || '未知',
          version: sysInfo.release || '未知',
          hostname: sysInfo.hostname || '未知',
          architecture: sysInfo.arch || '未知',
          uptime: sysInfo.uptime || 0
        };
      }

      if (cpu) {
        cpuInfo.value = {
          model: cpu.model || '未知',
          cores: cpu.cores || 0,
          speed: cpu.speed || 0
        };
      }

      if (mem) {
        const percentage = mem.total > 0 ? Math.round((mem.used / mem.total) * 100) : 0;
        memoryInfo.value = {
          total: mem.total || 0,
          used: mem.used || 0,
          free: mem.free || 0,
          percentage
        };
      }

      if (user) {
        userInfo.value = {
          username: user.username || '未知',
          homedir: user.homedir || '未知'
        };
      }
    } else {
      // 模拟数据用于Web环境
      systemInfo.value = {
        os: 'Web Browser',
        version: 'N/A',
        hostname: window.location.hostname,
        architecture: 'N/A',
        uptime: 0
      };

      cpuInfo.value = {
        model: 'N/A',
        cores: navigator.hardwareConcurrency || 0,
        speed: 0
      };

      // 估算内存信息
      memoryInfo.value = {
        total: 0,
        used: 0,
        free: 0,
        percentage: 0
      };

      userInfo.value = {
        username: 'Web User',
        homedir: '/'
      };
    }
  } catch (error) {
    console.error('Failed to fetch system info:', error);
  }
};

// 组件挂载时获取系统信息
onMounted(() => {
  fetchSystemInfo();
  
  // 每5秒更新一次系统信息
  const interval = setInterval(fetchSystemInfo, 5000);
  
  // 组件卸载时清除定时器
  onUnmounted(() => {
    clearInterval(interval);
  });
});
</script>

<style scoped>
.system-info-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.info-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 15px;
  margin-bottom: 15px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-label {
  font-weight: bold;
  color: #34495e;
}

.info-value {
  color: #2c3e50;
  text-align: right;
  word-break: break-all;
}

.memory-bar {
  width: 100%;
  height: 20px;
  background-color: #ecf0f1;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 10px;
}

.memory-fill {
  height: 100%;
  background: linear-gradient(90deg, #3498db, #2ecc71);
  transition: width 0.3s ease;
}
</style>