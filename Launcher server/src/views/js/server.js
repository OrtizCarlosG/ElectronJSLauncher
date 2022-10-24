const { ipcRenderer } = require("electron");
const ipc = ipcRenderer;
let servrContainer = document.querySelector(".serverContainer");

ipc.send("ServerReady");
ipc.on("newClientConnection", (event, data)=>{
    servrContainer.innerHTML += `<h3>Nuevo cliente: ${data} </h3>`;
    console.log('New connection from: ', data);
});