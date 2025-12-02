// 主题接口定义
export interface Theme {
  id: string;
  name: string;
  type: 'light' | 'dark';
  colors: {
    // 标题栏
    titleBarBackground: string;
    titleBarForeground: string;
    titleBarBorder: string;
    
    // 侧边栏
    sideBarBackground: string;
    sideBarForeground: string;
    sideBarBorder: string;
    
    // 编辑器区域
    editorBackground: string;
    editorForeground: string;
    
    // 状态栏
    statusBarBackground: string;
    statusBarForeground: string;
    
    // 标签页
    tabActiveBackground: string;
    tabInactiveBackground: string;
    tabActiveForeground: string;
    tabInactiveForeground: string;
    tabBorder: string;
    
    // 工具栏
    toolBarBackground: string;
    
    // 其他组件
    buttonBackground: string;
    buttonForeground: string;
    inputBackground: string;
    inputForeground: string;
    inputBorder: string;
  };
}

// 预定义主题
export const themes: Theme[] = [
  {
    id: 'dark',
    name: 'Dark',
    type: 'dark',
    colors: {
      titleBarBackground: '#3c3c3c',
      titleBarForeground: '#ffffff',
      titleBarBorder: '#000000',
      
      sideBarBackground: '#333333',
      sideBarForeground: '#cccccc',
      sideBarBorder: '#252526',
      
      editorBackground: '#1e1e1e',
      editorForeground: '#d4d4d4',
      
      statusBarBackground: '#333333', // 修改为与侧边栏一致的颜色
      statusBarForeground: '#ffffff',
      
      tabActiveBackground: '#1e1e1e',
      tabInactiveBackground: '#2d2d2d',
      tabActiveForeground: '#ffffff',
      tabInactiveForeground: '#ffffff',
      tabBorder: '#1a1a1a',
      
      toolBarBackground: '#333333',
      
      buttonBackground: '#1a1a1a',
      buttonForeground: '#ffffff',
      inputBackground: '#3c3c3c',
      inputForeground: '#cccccc',
      inputBorder: '#3c3c3c'
    }
  },
  {
    id: 'light',
    name: 'Light',
    type: 'light',
    colors: {
      titleBarBackground: '#dddddd',
      titleBarForeground: '#333333',
      titleBarBorder: '#cccccc',
      
      sideBarBackground: '#f3f3f3',
      sideBarForeground: '#616161',
      sideBarBorder: '#e0e0e0',
      
      editorBackground: '#ffffff',
      editorForeground: '#000000',
      
      statusBarBackground: '#007acc',
      statusBarForeground: '#ffffff',
      
      tabActiveBackground: '#ffffff',
      tabInactiveBackground: '#ececec',
      tabActiveForeground: '#333333',
      tabInactiveForeground: '#616161',
      tabBorder: '#e0e0e0',
      
      toolBarBackground: '#f3f3f3',
      
      buttonBackground: '#e0e0e0',
      buttonForeground: '#000000',
      inputBackground: '#ffffff',
      inputForeground: '#000000',
      inputBorder: '#cecece'
    }
  },
  {
    id: 'blue',
    name: 'Blue Theme',
    type: 'dark',
    colors: {
      titleBarBackground: '#1e4a7c',
      titleBarForeground: '#ffffff',
      titleBarBorder: '#000000',
      
      sideBarBackground: '#1a3e6d',
      sideBarForeground: '#cccccc',
      sideBarBorder: '#15355d',
      
      editorBackground: '#0d2b4e',
      editorForeground: '#d4d4d4',
      
      statusBarBackground: '#1a3e6d', // 修改为与侧边栏一致的颜色
      statusBarForeground: '#ffffff',
      
      tabActiveBackground: '#0d2b4e',
      tabInactiveBackground: '#1a3e6d',
      tabActiveForeground: '#ffffff',
      tabInactiveForeground: '#cccccc',
      tabBorder: '#15355d',
      
      toolBarBackground: '#1a3e6d',
      
      buttonBackground: '#15355d',
      buttonForeground: '#ffffff',
      inputBackground: '#1a3e6d',
      inputForeground: '#cccccc',
      inputBorder: '#15355d'
    }
  }
];

// 主题管理类
class ThemeManager {
  private currentTheme: Theme = themes[0];
  private listeners: ((theme: Theme) => void)[] = [];

  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  setCurrentTheme(themeId: string): void {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      this.currentTheme = theme;
      this.applyTheme(theme);
      this.notifyListeners(theme);
    }
  }

  subscribe(listener: (theme: Theme) => void): void {
    this.listeners.push(listener);
  }

  unsubscribe(listener: (theme: Theme) => void): void {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  private applyTheme(theme: Theme): void {
    // 应用主题到CSS变量
    const root = document.documentElement;
    
    // 标题栏
    root.style.setProperty('--title-bar-background', theme.colors.titleBarBackground);
    root.style.setProperty('--title-bar-foreground', theme.colors.titleBarForeground);
    root.style.setProperty('--title-bar-border', theme.colors.titleBarBorder);
    
    // 侧边栏
    root.style.setProperty('--side-bar-background', theme.colors.sideBarBackground);
    root.style.setProperty('--side-bar-foreground', theme.colors.sideBarForeground);
    root.style.setProperty('--side-bar-border', theme.colors.sideBarBorder);
    
    // 编辑器区域
    root.style.setProperty('--editor-background', theme.colors.editorBackground);
    root.style.setProperty('--editor-foreground', theme.colors.editorForeground);
    
    // 状态栏
    root.style.setProperty('--status-bar-background', theme.colors.statusBarBackground);
    root.style.setProperty('--status-bar-foreground', theme.colors.statusBarForeground);
    
    // 标签页
    root.style.setProperty('--tab-active-background', theme.colors.tabActiveBackground);
    root.style.setProperty('--tab-inactive-background', theme.colors.tabInactiveBackground);
    root.style.setProperty('--tab-active-foreground', theme.colors.tabActiveForeground);
    root.style.setProperty('--tab-inactive-foreground', theme.colors.tabInactiveForeground);
    root.style.setProperty('--tab-border', theme.colors.tabBorder);
    
    // 工具栏
    root.style.setProperty('--tool-bar-background', theme.colors.toolBarBackground);
    
    // 其他组件
    root.style.setProperty('--button-background', theme.colors.buttonBackground);
    root.style.setProperty('--button-foreground', theme.colors.buttonForeground);
    root.style.setProperty('--input-background', theme.colors.inputBackground);
    root.style.setProperty('--input-foreground', theme.colors.inputForeground);
    root.style.setProperty('--input-border', theme.colors.inputBorder);
  }

  private notifyListeners(theme: Theme): void {
    this.listeners.forEach(listener => listener(theme));
  }
}

// 导出单例实例
export const themeManager = new ThemeManager();