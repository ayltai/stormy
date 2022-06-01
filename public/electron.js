'use strict';

const { app, ipcMain, nativeImage, nativeTheme, } = require('electron');

const path = require('path');
const url  = require('url');
const fs   = require('fs');

const handleError = console.error;

const WINDOW_WIDTH  = 320;
const WINDOW_HEIGHT = 623;

const writeFile = (file, data) => new Promise((resolve, reject) => {
    try {
        fs.writeFileSync(file, data, 'binary');
        resolve();
    } catch (error) {
        reject(error);
    }
});

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true';

app.commandLine.appendSwitch('disable-web-security');

app.whenReady().then(() => {
    if (!app.isPackaged) {
        const { default : installExtension, REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS, } = require('electron-devtools-installer');

        installExtension([
            REACT_DEVELOPER_TOOLS,
            REDUX_DEVTOOLS,
        ]).catch(handleError);
    }

    const menubar = require('menubar').menubar({
        index               : app.isPackaged ? url.pathToFileURL(path.join(__dirname, 'index.html')).toString() : `http://localhost:${process.env.PORT || 3000}`,
        icon                : path.join(__dirname, 'img', 'menubarTemplate.png'),
        preloadWindow       : true,
        showOnAllWorkspaces : false,
        showDockIcon        : false,
        browserWindow       : {
            width          : WINDOW_WIDTH,
            height         : WINDOW_HEIGHT,
            resizable      : false,
            skipTaskbar    : true,
            webPreferences : {
                allowRunningInsecureContent : true,
                contextIsolation            : false,
                enableRemoteModule          : true,
                nodeIntegration             : true,
                nodeIntegrationInWorker     : true,
                sandbox                     : false,
                webSecurity                 : false,
            },
        },
    });

    if (!app.isPackaged) menubar.on('ready', () => menubar.window.webContents.openDevTools({
        mode : 'detach',
    }));

    if (process.platform === 'darwin') app.dock.hide();

    ipcMain.on('refresh', (event, data) => {
        const icon   = path.join(app.getPath('temp'), 'icon.png');
        const icon2x = path.join(app.getPath('temp'), 'icon@2x.png');

        Promise.all([
            writeFile(icon, nativeImage.createFromDataURL(data.icon).toPNG()),
            writeFile(icon2x, nativeImage.createFromDataURL(data.icon2x).toPNG()),
        ]).then(() => menubar.tray.setImage(icon)).catch(handleError);

        if (process.platform === 'darwin') menubar.tray.setTitle(data.temperature);
    });

    ipcMain.on('set-auto-launch', (event, data) => app.setLoginItemSettings({
        openAsHidden : true,
        openAtLogin  : data,
        path         : app.getPath('exe'),
    }));

    ipcMain.on('get-app-path', event => event.sender.send('set-app-path', app.getAppPath()));
    ipcMain.on('get-dark-mode', event => event.sender.send('set-dark-mode', nativeTheme.shouldUseDarkColors));
    ipcMain.on('change-dark-mode', (event, data) => nativeTheme.themeSource = data ? 'dark' : 'light');
    ipcMain.on('exit', () => app.quit());
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
