// main.js

// https://www.electronforge.io/config/makers/squirrel.windows
if (require('electron-squirrel-startup')) return;

const { app, shell, session, BrowserWindow, Menu, Tray, nativeImage, dialog } = require('electron')
const { getHA, setHA } = require('./settings.js');
const path = require('path');

const domain = '.apple.com';
const url = `https://beta.music${domain}`;

// Disable Hardware Acceleration
// https://www.electronjs.org/docs/latest/tutorial/offscreen-rendering
if (!getHA()) {
    app.disableHardwareAcceleration()
}

// Function to set multiple cookies
function setCookies() {
    // Unix timestamp for one month from now
    const oneMonthFromNow = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); 
    const cookies = [
        {
            url: url,
            name: 'POD',
            value: 'ch~de',
            domain: domain,
            expirationDate: oneMonthFromNow
        },
        {
            url: url,
            name: 'dslang',
            value: 'CH-DE',
            domain: domain,
            expirationDate: oneMonthFromNow
        },
        {
            url: url,
            name: 'site',
            value: 'CHE',
            domain: domain,
            expirationDate: oneMonthFromNow
        }
    ];

    cookies.forEach(cookie => {
        session.defaultSession.cookies.set(cookie)
            .then(() => {
                console.log(`Cookie ${cookie.name} set successfully`);
            }, (error) => {
                console.error(`Error setting cookie ${cookie.name}:`, error);
            });
    });
}

createWindow = () => {
    const win = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'Apple Music Desktop',
        icon: './images/icon',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            webSecurity: true,
            webviewTag: true,
            nativeWindowOpen: true
        }
    });

    // Set custom user agent
    win.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.6723.70 Safari/537.36');

    // menu template
    const template = [
        {
            label: 'Developer',
            submenu: [
                {
                    role: 'reload'
                },
                {
                    role: 'forcereload'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'toggledevtools'
                },
                {
                    type: 'separator'
                },
                {
                    role: 'close'
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

    // Open links with external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        require('electron').shell.openExternal(url);
        return { action: 'deny' };
    });

    // Load the URL
    win.loadURL(`${url}/ch/library/all-playlists/`);

    // Handle cookies
    // setCookies();

};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});