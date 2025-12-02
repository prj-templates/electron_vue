<template>
  <div class="view-container">
    <header class="view-header">
      <h2>🔧 设置</h2>
      <p>配置应用程序选项和偏好设置</p>
    </header>

    <div class="settings-grid">
      <div class="card">
        <div class="card-header">
          <h3>常规设置</h3>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">开机自启</div>
              <div class="setting-description">系统启动时自动运行此应用程序</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">后台运行</div>
              <div class="setting-description">关闭窗口后继续在系统托盘运行</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">自动检查更新</div>
              <div class="setting-description">定期检查新版本并提示更新</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input type="checkbox" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>界面设置</h3>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">主题</div>
              <div class="setting-description">选择应用程序的主题颜色</div>
            </div>
            <div class="setting-control">
              <select class="form-select">
                <option>浅色主题</option>
                <option selected>深色主题</option>
                <option>系统默认</option>
              </select>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">语言</div>
              <div class="setting-description">更改应用程序显示语言</div>
            </div>
            <div class="setting-control">
              <select class="form-select">
                <option selected>简体中文</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3>数据设置</h3>
        </div>
        <div class="card-body">
          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">数据收集</div>
              <div class="setting-description">允许收集匿名使用数据以改进产品</div>
            </div>
            <div class="setting-control">
              <label class="switch">
                <input type="checkbox">
                <span class="slider"></span>
              </label>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-info">
              <div class="setting-label">清除缓存</div>
              <div class="setting-description">删除临时文件和缓存数据</div>
            </div>
            <div class="setting-control">
              <button class="btn btn-secondary">清除</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card full-width">
        <div class="card-header">
          <h3>关于</h3>
        </div>
        <div class="card-body">
          <div class="about-section">
            <div class="app-logo">🛠️</div>
            <div class="app-name">小工具箱</div>
            <div class="app-version">版本 1.0.0</div>
            <div class="app-description">
              一个多功能系统信息查看和管理工具，帮助您更好地了解和管理系统资源。
            </div>
            <div class="app-links">
              <button class="btn btn-link">检查更新</button>
              <button class="btn btn-link">用户手册</button>
              <button class="btn btn-link">反馈问题</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里将来会实现真实的设置功能
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

.settings-grid {
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
  background: #34495e;
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-body {
  padding: 20px;
}

.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;
}

.setting-item:last-child {
  border-bottom: none;
}

.setting-info {
  flex: 1;
}

.setting-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 5px;
}

.setting-description {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.form-select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-secondary {
  background-color: #95a5a6;
  color: white;
}

.btn-secondary:hover {
  background-color: #7f8c8d;
}

.btn-link {
  background: none;
  color: #3498db;
  text-decoration: underline;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #3498db;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.about-section {
  text-align: center;
  padding: 20px 0;
}

.app-logo {
  font-size: 4rem;
  margin-bottom: 15px;
}

.app-name {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.app-version {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.app-description {
  color: #34495e;
  max-width: 600px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.app-links {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}
</style>