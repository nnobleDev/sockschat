const express = require('express');
const app = express();
const path = require('path');
const socketIO = require('socket.io');//SocketIO requiere de un servidor ya funcionando,por lo que vamos a configurarlo con el que ya escribimos
//SETTINGS SERVER
app.set('port', process.env.PORT || 3000); // Asignamos el puerto extablecido por el sistema operativo, en su defecto el puerto 3000

//ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public'))); 
//INICIAMOS EL SERVIDOR
const server = app.listen(app.get('port'), ()=>{
    console.log("Servidor corriendo en el puerto " + app.get('port'));
})

//SETTINGS SOCKET IO
const IO=socketIO(server);


//WEB SOCKETS

IO.on('connection',(socket)=>{// enviamos el console.log cuando se abra una coneccion; el parametro socket es lo que recibimos del socket declarado en chat.js
    console.log("Usuario conectado", socket.id);
    socket.on('chat:message',(data)=>{//el socket que mantiene la conexion con el cliente, escucha el evento que creamos en este con los datos del chat
        console.log(data)//MOSTRAMOS EN CONSOLA EL OBJTO DATA QUE NOS LLEGA DEL CLIENTE
        IO.sockets.emit('chat:message', data);//emitimos un evento desde el servidor con los datos que nos llegan desde el cliente para poder reenviarlos a todos los navegadores conetados
        // y tambien poder mostrarlo en el nuestro  
    });
    socket.on('chat:typing', (usuario)=>{
        console.log(usuario);
        //usamos broadcast para emitir a todos los navegadores menos el que envio el dato
        socket.broadcast.emit('chat:typing', usuario);
    });
});


