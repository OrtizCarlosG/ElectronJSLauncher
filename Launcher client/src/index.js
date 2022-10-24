const{app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const WebSocket = require('ws');
const { contextIsolated } = require('process');
const ipc = ipcMain;
let ws;
if (process.env.NODE_ENV !== 'production')
{
    require('electron-reload')(__dirname, {

    });
}

let mainWindow = {};

app.on('ready', () => {
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences : {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true, // use remote module
   }
});
   mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'views/html/index.html'), 
    protocol: 'file', 
    slashes: true,
   }))
   //mainWindow.setMenu(null);
   init();
});

function init() {
      if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
      }

      ws = new WebSocket('ws://localhost:6969');
      ws.onopen = () => {
        console.log('Connection opened!');
      }
      ws.onmessage = ({ data }) => showMessage(data);
      ws.onclose = function() {
        ws = null;
      }
      ipc.on("clientSend", (event, data) => {
         ws.send(data); 
      })
}

function showMessage(message) {
   console.log(message);
}