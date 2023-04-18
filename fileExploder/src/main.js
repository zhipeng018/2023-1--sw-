var electron = require('electron')
var app = electron.app
var BrowserWindow = electron.BrowserWindow
var BroserView = electron.BrowserView
//var globalShortcut = electron.globalShortcut

const path = require('path')

var mainWindow = null

app.on('ready',function(){
    const mainWindow = new BrowserWindow({
        height:500,
        width:800,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    require('@electron/remote/main').initialize()
    //require("@electron/remote/main").enable(mainWindow.webContents)
    //require('./main/menu')
    //remote.enable(mainWIn.webContents)
    mainWindow.loadFile(path.resolve(__dirname, 'mac.html'))
    mainWindow.webContents.openDevTools()
    //mainWindow.openDevTools()
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})

app.on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+Y')

    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
})