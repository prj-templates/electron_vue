<template>
  <div class="view-container">
    <header class="view-header">
      <h2>💾 磁盘信息</h2>
      <p>查看磁盘驱动器和存储使用情况</p>
    </header>

    <div class="drives-grid">
      <div class="drive-card">
        <div class="drive-header">
          <div class="drive-icon">💾</div>
          <div class="drive-name">本地磁盘 (C:)</div>
        </div>
        <div class="drive-stats">
          <div class="stat-item">
            <div class="stat-label">总容量</div>
            <div class="stat-value">476 GB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">已使用</div>
            <div class="stat-value">320 GB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">可用空间</div>
            <div class="stat-value">156 GB</div>
          </div>
        </div>
        <div class="usage-bar">
          <div class="usage-fill" style="width: 67%"></div>
        </div>
        <div class="usage-text">67% 已使用</div>
      </div>

      <div class="drive-card">
        <div class="drive-header">
          <div class="drive-icon">💾</div>
          <div class="drive-name">数据盘 (D:)</div>
        </div>
        <div class="drive-stats">
          <div class="stat-item">
            <div class="stat-label">总容量</div>
            <div class="stat-value">931 GB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">已使用</div>
            <div class="stat-value">420 GB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">可用空间</div>
            <div class="stat-value">511 GB</div>
          </div>
        </div>
        <div class="usage-bar">
          <div class="usage-fill" style="width: 45%"></div>
        </div>
        <div class="usage-text">45% 已使用</div>
      </div>

      <div class="drive-card">
        <div class="drive-header">
          <div class="drive-icon">💾</div>
          <div class="drive-name">外接硬盘 (E:)</div>
        </div>
        <div class="drive-stats">
          <div class="stat-item">
            <div class="stat-label">总容量</div>
            <div class="stat-value">1.8 TB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">已使用</div>
            <div class="stat-value">1.2 TB</div>
          </div>
          <div class="stat-item">
            <div class="stat-label">可用空间</div>
            <div class="stat-value">600 GB</div>
          </div>
        </div>
        <div class="usage-bar">
          <div class="usage-fill" style="width: 67%"></div>
        </div>
        <div class="usage-text">67% 已使用</div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <h3>详细信息</h3>
      </div>
      <div class="card-body">
        <table class="detail-table">
          <thead>
            <tr>
              <th>驱动器</th>
              <th>文件系统</th>
              <th>总容量</th>
              <th>已使用</th>
              <th>可用空间</th>
              <th>使用率</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C:</td>
              <td>NTFS</td>
              <td>476 GB</td>
              <td>320 GB</td>
              <td>156 GB</td>
              <td>
                <div class="mini-usage-bar">
                  <div class="mini-usage-fill" style="width: 67%"></div>
                </div>
                <span class="usage-percent">67%</span>
              </td>
            </tr>
            <tr>
              <td>D:</td>
              <td>NTFS</td>
              <td>931 GB</td>
              <td>420 GB</td>
              <td>511 GB</td>
              <td>
                <div class="mini-usage-bar">
                  <div class="mini-usage-fill" style="width: 45%"></div>
                </div>
                <span class="usage-percent">45%</span>
              </td>
            </tr>
            <tr>
              <td>E:</td>
              <td>NTFS</td>
              <td>1.8 TB</td>
              <td>1.2 TB</td>
              <td>600 GB</td>
              <td>
                <div class="mini-usage-bar">
                  <div class="mini-usage-fill" style="width: 67%"></div>
                </div>
                <span class="usage-percent">67%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里将来会实现真实的磁盘信息获取逻辑
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

.drives-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.drive-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.drive-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.drive-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.drive-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
}

.drive-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.stat-item {
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: #7f8c8d;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
}

.usage-bar {
  height: 10px;
  background-color: #ecf0f1;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 10px;
}

.usage-fill {
  height: 100%;
  background: linear-gradient(90deg, #2ecc71, #f1c40f, #e74c3c);
}

.usage-text {
  text-align: center;
  font-size: 0.9rem;
  color: #7f8c8d;
  font-weight: 500;
}

.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 20px;
}

.card-header {
  padding: 15px 20px;
  background: #e67e22;
  color: white;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.card-body {
  padding: 20px;
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
}

.detail-table th,
.detail-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.detail-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #34495e;
}

.mini-usage-bar {
  display: inline-block;
  width: 80px;
  height: 8px;
  background-color: #ecf0f1;
  border-radius: 4px;
  overflow: hidden;
  vertical-align: middle;
  margin-right: 10px;
}

.mini-usage-fill {
  height: 100%;
  background: linear-gradient(90deg, #2ecc71, #f1c40f, #e74c3c);
}

.usage-percent {
  vertical-align: middle;
}
</style>