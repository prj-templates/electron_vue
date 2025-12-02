<template>
  <div class="view-container">
    <header class="view-header">
      <h2>⚙️ 进程管理</h2>
      <p>管理系统正在运行的进程</p>
    </header>

    <div class="toolbar">
      <div class="search-box">
        <input type="text" placeholder="搜索进程..." class="search-input">
        <button class="btn btn-primary">刷新</button>
      </div>
    </div>

    <div class="table-container">
      <table class="process-table">
        <thead>
          <tr>
            <th>进程名</th>
            <th>PID</th>
            <th>CPU%</th>
            <th>内存(MB)</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>explorer.exe</td>
            <td>1234</td>
            <td>2.5</td>
            <td>85.3</td>
            <td>运行中</td>
            <td>
              <button class="btn btn-danger btn-sm">结束进程</button>
            </td>
          </tr>
          <tr>
            <td>chrome.exe</td>
            <td>2345</td>
            <td>15.2</td>
            <td>1200.5</td>
            <td>运行中</td>
            <td>
              <button class="btn btn-danger btn-sm">结束进程</button>
            </td>
          </tr>
          <tr>
            <td>vscode.exe</td>
            <td>3456</td>
            <td>8.7</td>
            <td>560.2</td>
            <td>运行中</td>
            <td>
              <button class="btn btn-danger btn-sm">结束进程</button>
            </td>
          </tr>
          <tr>
            <td>spotify.exe</td>
            <td>4567</td>
            <td>1.2</td>
            <td>45.8</td>
            <td>运行中</td>
            <td>
              <button class="btn btn-danger btn-sm">结束进程</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
// 这里将来会实现真实的进程管理逻辑
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

.toolbar {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-box {
  display: flex;
  gap: 10px;
}

.search-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 300px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background-color: #c0392b;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 0.85rem;
}

.table-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.process-table {
  width: 100%;
  border-collapse: collapse;
}

.process-table th,
.process-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.process-table th {
  background-color: #f8f9fa;
  font-weight: 600;
  color: #34495e;
}

.process-table tbody tr:hover {
  background-color: #f5f7fa;
}

.process-table tbody tr:last-child td {
  border-bottom: none;
}
</style>