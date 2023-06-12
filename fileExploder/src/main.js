var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var BrowserView = electron.BrowserView

const path = require('path');

var mainWindow = null
app.allowRendererProcessReuse = true
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
    require('@electron/remote/main').enable(mainWindow.webContents)
   
    require('@electron/remote/main').initialize()
    mainWindow.loadFile(path.resolve(__dirname, 'mac.html'))
    mainWindow.webContents.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })


    app.on('will-quit', () => {
        // Unregister a shortcut.
        globalShortcut.unregister('CommandOrControl+Y')

        // Unregister all shortcuts.
        globalShortcut.unregisterAll()
    })
})
