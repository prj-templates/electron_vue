/**
 * @see https://www.electron.build/configuration/configuration
 */
module.exports = {
  appId: "com.example.electronvue",
  productName: "Electron Vue 小工具箱",
  directories: {
    output: "release/${version}"
  },
  files: [
    "dist/**/*",
    "main.cjs",
    "electron/**/*"
  ],
  extends: null,
  win: {
    icon: "public/vite.svg",
    target: [
      {
        target: "nsis",
        arch: [
          "x64"
        ]
      }
    ]
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowToChangeInstallationDirectory: true,
    deleteAppDataOnUninstall: false
  },
  mac: {
    icon: "public/vite.svg",
    target: [
      "dmg"
    ]
  },
  linux: {
    icon: "public/vite.svg",
    target: [
      "AppImage"
    ]
  }
}