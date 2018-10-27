const { app, BrowserWindow } = require('electron');
const url = require('url');

let win: Electron.BrowserWindow;

function createWindow () {
  win = new BrowserWindow({
    width: 1300, 
    height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    show: false,
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


