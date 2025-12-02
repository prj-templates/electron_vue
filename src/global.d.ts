export {};

declare global {
  interface Window {
    electron: any;
    api: {
      sendMessage: (message: string) => void;
      receiveMessage: (channel: string, func: (...args: any[]) => void) => void;
      // 系统信息相关API
      getSystemInfo: () => any;
      getCpuInfo: () => any;
      getMemoryInfo: () => any;
      getNetworkInterfaces: () => any;
      getUserInfo: () => any;
      // 窗口控制 API
      window: {
        minimize: () => void;
        maximize: () => void;
        close: () => void;
      };
    };
  }
}