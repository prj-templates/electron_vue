<template>
  <div class="view-container">
    <header class="view-header">
      <h2>🌐 网络状态</h2>
      <p>查看网络连接和适配器信息</p>
    </header>

    <div class="content-grid">
      <div class="card">
        <div class="card-header">
          <h3>网络适配器</h3>
        </div>
        <div class="card-body">
          <div class="adapter-list">
            <div v-for="(interfaces, name) in networkInterfaces" :key="name" class="adapter-item">
              <div class="adapter-name">{{ name }}</div>
              <div 
                class="adapter-status" 
                :class="{ connected: hasActiveConnection(interfaces), disconnected: !hasActiveConnection(interfaces) }"
              >
                {{ hasActiveConnection(interfaces) ? '已连接' : '已断开' }}
              </div>
              <div class="adapter-detail">
                <div v-for="(iface, index) in interfaces" :key="index" class="detail-row">
                  <span class="label">{{ iface.family }} 地址:</span>
                  <span class="value">{{ iface.address }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>用户信息</h3>
        </div>
        <div class="card-body">
          <div class="info-row">
            <span class="info-label">用户名:</span>
            <span class="info-value">{{ userInfo?.username || 'Loading...' }}</span>
          </div>
          <div class="info-row">
            <span class="info-label">主目录:</span>
            <span class="info-value">{{ userInfo?.homedir || 'Loading...' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 定义响应式数据
const networkInterfaces = ref<any>({});
const userInfo = ref<any>(null);

// 检查是否有活跃连接
const hasActiveConnection = (interfaces: Array<any>) => {
  return interfaces.some((i: any) => !i.internal && i.address);
};

// 获取网络信息
const fetchNetworkInfo = () => {
  try {
    // @ts-ignore
    if (window.api) {
      // @ts-ignore
      networkInterfaces.value = window.api.getNetworkInterfaces();
      // @ts-ignore
      userInfo.value = window.api.getUserInfo();
    }
  } catch (error) {
    console.error('Failed to fetch network info:', error);
  }
};

onMounted(() => {
  fetchNetworkInfo();
  
  // 每隔5秒刷新一次数据
  setInterval(fetchNetworkInfo, 5000);
});
</script>

<style scoped>
.view-container {
  max-width: 1200px;
  margin: 0 auto;
}

.view-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.view-header h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 10px;
}

.view-header p {
  margin: 0;
  color: #7f8c8d;
  font-size: 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.full-width {
  grid-column: 1 / -1;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: 15px 20px;
  background: #9b59b6;
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-body {
  padding: 20px;
}

.adapter-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.adapter-item {
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 6px;
}

.adapter-name {
  font-weight: 600;
  margin-bottom: 5px;
  color: #2c3e50;
}

.adapter-status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 0.8rem;
  font-weight: bold;
}

.adapter-status.connected {
  background-color: #2ecc71;
  color: white;
}

.adapter-status.disconnected {
  background-color: #e74c3c;
  color: white;
}

.adapter-detail {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px dashed #eee;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.detail-row .label {
  color: #7f8c8d;
}

.detail-row .value {
  color: #2c3e50;
  font-weight: 500;
  word-break: break-all;
  text-align: right;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 600;
  color: #34495e;
}

.info-value {
  color: #7f8c8d;
  text-align: right;
  max-width: 60%;
  word-break: break-all;
}
</style>