console.log('Codigo de chat');

const socket = io();//variable creada por el modulo de socket.io que importamos en el html.
// esta variable mantiene la conexion con el servidor
//CODIGO DEL CHAT EN EL CLIENTE

//Capturando las secciones de nuestra app.
let mensaje = document.getElementById('message');
let usuario = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

//agregamos el evento click al boton
btn.addEventListener('click', ()=>{
    actions.innerHTML='';
    socket.emit('chat:message',{//envia con el evento chat:message el objeto con los datos
        usuario: usuario.value,
        mensaje: mensaje.value
    })
    console.log('Datos enviados al servidor'); 
});
mensaje.addEventListener('keypress', ()=>{
    console.log(usuario.value);
    socket.emit('chat:typing', usuario.value) //cuando alguien este escribiendo enviamos al servidor su nombre 
});
//escuchamos el evento enviado desde el servidor con los daos
socket.on('chat:message', (data)=>{
    console.log(data);
    output.innerHTML += '<p><strong>'+ data.usuario + ': </strong>'+data.mensaje+'</p>'
});

//escuchamos el evento chat:typing que nos llega del servidor

socket.on('chat:typing', (usuario)=>{
    actions.innerHTML='<p><em> ' +usuario+ ' esta escribiendo....</em></p>';
});