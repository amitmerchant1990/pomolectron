'use strict';
const electron = require('electron');
var menubar = require('menubar');

const ipcMain = require('electron').ipcMain;

var mb = menubar({dir:__dirname, tooltip: "Glyphilectron", icon:__dirname + "/res/tomato.png", width:324, height:420, resizable: false, alwaysOnTop :true});

const contextMenu = electron.Menu.buildFromTemplate([
  {
    label: 'About',
    click() {
      electron.dialog.showMessageBox({title: "Pomolectron", type:"info", message: "A pomodoro app in your menubar/tray. \nMIT Copyright (c) 2017 Amit Merchant <bullredeyes@gmail.com>", buttons: ["Close"] });
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
      mb.app.quit();
    }
  }

]);

ipcMain.on('closeApp', (event, close) => {
  mb.app.quit();
});

mb.on('ready', function ready () {
  global.sharedObj = {
    hide: mb.hideWindow,
    quit: mb.app.quit,
    pinned: false
  }

  console.log('Pomolectron is ready to serve in the menubar.');

  if (process.platform == 'win32') {
    mb.tray.setContextMenu(contextMenu);
  }
});

mb.on('after-create-window', function(){
  //mb.window.openDevTools()
})
