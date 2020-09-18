const {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  nativeImage,
} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4T5XTvyvFYRTH8dfNP+BHBhm5MhlkZlJISvkDzOoqDCaTwaiUXVkMRmWgsBkMEiEMJikZDEopOvV8ebou93qW73Oecz7v5zznnG/J95rCRjKnsZ35FrCCF4zjuPCVsqAdnCW7LwUW7iusYgiPmMsBYQxjAMvJsYSTDB7CyHAUE7jAJrYig3c0peDZ9F3LxMV2LAEq6eAavQH4yIJv0r5cA3CKdnQm3y3KBeAIrzVEvx0FqDkHxI1BbHRFLeKZXxk0AmhJtXpKtfgXoA37OMB8PUA37rLiFuIHTOKtHuASh5hBa7o5F0ed/qxBV0p1D/2oFtcFREABOc/SzjvUUBc68JzeXN3eH4D4F+4bHQIMYhE9MYm7GPmHOEJj/NdR+QRLoU8RV98GsgAAAABJRU5ErkJggg==';

let tray;
let window;

app.on('ready', () => {
  const icon = nativeImage.createFromDataURL(base64Icon);
  tray = new Tray(icon);
  tray.on('click', event => {
    toggleWindow();
    // if (window.isVisible() && process.defaultApp && event.metaKey) {
    //   window.openDevTools({ mode: 'detach' });
    // }
  });

  window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    frame: false,
    resizable: false,
  });


  window.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  // window.loadFile(path.join(__dirname, '/build/index.html'));
  // window.loadURL('http://localhost:3000');

  // window.webContents.openDevTools();
  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });
});

const showWindow = () => {
  const trayPos = tray.getBounds();
  const windowPos = window.getBounds();
  let x; let
    y = 0;
  if (process.platform === 'darwin') {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height);
  } else {
    x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
    y = Math.round(trayPos.y + trayPos.height * 10);
  }

  window.setPosition(x, y, false);
  window.show();
  window.focus();
};

const toggleWindow = () => {
  if (window.isVisible()) {
    window.hide();
  } else {
    showWindow();
  }
};

ipcMain.on('show-window', () => {
  showWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
