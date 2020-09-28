const { app, BrowserWindow } = require('electron')

function createWindow () {
  // Cria uma janela de navegação.
  const win = new BrowserWindow({
    width: 800,
    height: 900,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  // e carrega o arquivo index.html do seu aplicativo.
  win.loadFile('./dist/index.html');

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow)
