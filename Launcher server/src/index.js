const{app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const exp = require('express');
const http = require('http');
const WebSocket = require('ws');
const packets = require('./packets');
const { contextIsolated } = require('process');
const port = 6969;
const server = http.createServer(exp);
const wss = new WebSocket.Server({ server })
const ipc = ipcMain;
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
ipc.on("ServerReady", () => {
  serverStart();
})
});

wss.on('connection', function connection(ws, req) {
  mainWindow.webContents.send("newClientConnection", req.socket.remoteAddress);
    ws.on('message', function incoming(data) {
      packet = JSON.parse(data.toString())
      console.log(data.toString());
      if (packet[0] == "logIn")
          packets.logIn(ws, data.toString()) ? sendDataToClient(ws, JSON.stringify(['logIn', "true"])) : sendDataToClient(ws, JSON.stringify(['logIn', "false"]));
    })
  })

function sendDataToAll(data)
{
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) { 
      client.send(data);
    }
  })
}

function sendDataToAll(exceptClient, data)
{
  wss.clients.forEach(function each(client) {
    if (client !== exceptClient && client.readyState === WebSocket.OPEN) { 
      client.send(data);
    }
  })
}

function sendDataToClient(toClient, data)
{
  wss.clients.forEach(function each(client) {
    if (client === toClient)
      client.send(data);
  })
}
  
  function serverStart() {
    server.listen(port);
    console.log(`Server is listening on ${port}!`)
  }
  module.exports = {
    serverStart
  }