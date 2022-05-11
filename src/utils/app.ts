import path from 'path';
import url from 'url';

import { MENU_ICON_SIZE, } from '../Constants';

import { convertTemperature, handleError, } from './index';

const getElectron = () => {
    let electron : any;

    try {
        electron = window.require('electron') || require('electron');
    } catch (error) {
        try {
            electron = require('electron');
        } catch (e) {
            electron = {
                ipcRenderer : {
                    on   : (message : string, args? : any) => {},
                    send : (message : string, args? : any) => {},
                },
                shell       : {
                    openExternal : (uri : string) => {},
                },
            };
        }
    }

    return electron;
};

let appPath : string = __dirname;
let nativeDarkMode   = false;

if (process.env.JEST_WORKER_ID === undefined) {
    getElectron().ipcRenderer.send('get-app-path');
    getElectron().ipcRenderer.on('set-app-path', (event : any, data : string) => appPath = data);

    getElectron().ipcRenderer.send('get-dark-mode');
    getElectron().ipcRenderer.on('set-dark-mode', (event : any, data : boolean) => nativeDarkMode = data);
}

export const getLocale = () => Intl.DateTimeFormat().resolvedOptions().locale;

export const isDarkMode = () => nativeDarkMode;

export const openUrl = (uri : string) => getElectron().shell.openExternal(uri);

export const setAppAutoLaunch = (enabled : boolean) => getElectron().ipcRenderer.send('set-auto-launch', enabled);

const createIcon = ({
    icon,
    scale,
} : {
    icon  : string,
    scale : number,
}) => new Promise<string>(resolve => {
    const size = MENU_ICON_SIZE * scale;

    const canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size;

    const context = canvas.getContext('2d');
    const image   = new Image(size, size);

    image.onload = () => {
        context!.scale(scale, scale);
        context!.drawImage(image, 0, 0, size, size, 0, 0, MENU_ICON_SIZE, MENU_ICON_SIZE);

        resolve(canvas.toDataURL());
    };

    image.src = process.env.NODE_ENV === 'development' ? path.join('img', 'dark', `${icon}.svg`) : url.pathToFileURL(path.join(appPath, 'build', 'img', 'dark', `${icon}.svg`)).toString();
});

export const updateMenu = ({
    temperature,
    icon,
} : {
    temperature : number,
    icon        : string,
}) => {
    Promise.all([
        createIcon({
            icon,
            scale : 1,
        }),
        createIcon({
            icon,
            scale : 2,
        }),
    ]).then(([ icon1, icon2, ]) => {
        getElectron().ipcRenderer.send('refresh', {
            temperature : convertTemperature({
                temperature,
                displayUnit    : true,
                fractionDigits : 0,
            }),
            icon        : icon1,
            icon2x      : icon2,
        });
    }).catch(handleError);
};

export const exit = () => getElectron().ipcRenderer.send('exit');
