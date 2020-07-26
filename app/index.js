'use strict';
const electron = require('electron');
const ipcMain = require('electron').ipcMain;

let tray = null
let window = null
electron.app.whenReady().then(() => {
  tray = new electron.Tray(__dirname + "/res/tomato.png")
  const contextMenu = electron.Menu.buildFromTemplate([
    {
      label: 'Open interface',
      click() {
        window = new electron.BrowserWindow({
          width: 300,
          height: 250,
          x: electron.screen.getPrimaryDisplay().workAreaSize.width - 300,
          y: 0,
          webPreferences: { nodeIntegration: true },
          frame: false
        })
        window.loadURL(`file://${__dirname}/index.html`)
      }
    },
    {
      label: 'About',
      click() {
        electron.dialog.showMessageBox({ title: "Pomolectron", type: "info", message: "A pomodoro app in your menubar/tray. \nMIT Copyright (c) 2017 Amit Merchant <bullredeyes@gmail.com>", buttons: ["Close"] });
      }
    },
    {
      label: 'Website',
      click() {
        electron.shell.openExternal("https://github.com/amitmerchant1990/pomolectron");
      }
    },
    {
      type: 'separator'
    },
    {
      label: 'Quit',
      click() {
        electron.app.quit();
      }
    }

  ]);
  tray.setToolTip('Pomolectron')
  tray.setContextMenu(contextMenu)
})


ipcMain.on('closeApp', (event, close) => {
  electron.app.quit();
});
