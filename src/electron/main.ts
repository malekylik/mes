import * as url from 'url';
import * as path from 'path';

import { app, BrowserWindow } from 'electron'; 

import { Database } from './database/Database';

let win: Electron.BrowserWindow;

async function createWindow () {
  win = new BrowserWindow({
    width: 1300, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enableRemoteModule: true,
    }
  });

  // win.loadURL(url.format({
  //   pathname: path.join(__dirname, 'dist/angular-electoron/index.html'),
  //   protocol: 'file:',
  //   slashes: true
  // }));

  win.loadURL(url.format({
    pathname: 'localhost:4200',
    protocol: 'http:',
    slashes: true
  }));

  win.on('closed', () => {
    win = null
  });

  win.once('ready-to-show', () => {
    win.show()
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

process.on('exit', () => {
  if (Database.isConnected()) {
    Database.close();
  }
});
