var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var BrowserView = electron.BrowserView

const path = require('path');

var mainWindow = null

app.on('ready', function() {
    const mainWindow = new BrowserWindow({
        height: 500,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    require('@electron/remote/main').initialize()
    mainWindow.loadFile(path.resolve(__dirname, 'mac.html'))
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    const Octokit = require('@octokit/rest');
    const octokit = new Octokit({
        auth: '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',
    });

    app.on('will-quit', () => {
        // Unregister a shortcut.
        globalShortcut.unregister('CommandOrControl+Y')

        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    })
})
