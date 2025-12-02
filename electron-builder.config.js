/**
 * @type {import('electron-builder').Configuration}
 * @see https://www.electron.build/configuration/configuration
 */
const config = {
  appId: 'com.electron_vue.app',
  productName: 'Electron Vue App',
  directories: {
    output: 'release/${version}'
  },
  files: [
    'dist/**/*',
    'dist-electron/**/*'
  ],
  extends: null,
  win: {
    icon: 'public/vite.svg',
    target: [
      {
        target: 'nsis',
        arch: ['x64']
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
    icon: 'public/vite.svg',
    target: ['dmg']
  },
  linux: {
    icon: 'public/vite.svg',
    target: ['AppImage']
  }
}

module.exports = config