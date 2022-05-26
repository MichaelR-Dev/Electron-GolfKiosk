const { app, BrowserWindow } = require('electron');
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        fullscreen: true,
        autoHideMenuBar: false,
        backgroundColor: '#c4a45e',
        frame: true,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false
        }
    })

    win.loadFile('index.html');
}

app.whenReady().then(()=>{
    createWindow();

    /*app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })*/

    

})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})