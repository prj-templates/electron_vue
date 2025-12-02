"use strict";
const electron = require("electron");
const api = {
  sendMessage: (message) => {
    electron.ipcRenderer.send("message", message);
  },
  receiveMessage: (callback) => {
    electron.ipcRenderer.on("receive-message", (_event, data) => callback(data));
  }
};
if (process.contextIsolated) {
  try {
    electron.contextBridge.exposeInMainWorld("electron", api);
    electron.contextBridge.exposeInMainWorld("api", {
      sendMessage: (message) => electron.ipcRenderer.send("message", message),
      receiveMessage: (channel, func) => {
        const validChannels = ["receive-message"];
        if (validChannels.includes(channel)) {
          electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = api;
  window.api = {
    sendMessage: (message) => electron.ipcRenderer.send("message", message),
    receiveMessage: (channel, func) => {
      const validChannels = ["receive-message"];
      if (validChannels.includes(channel)) {
        electron.ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    }
  };
}
