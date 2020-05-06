var socket = io();
// Escuchar eventos
socket.on('connect', function() {
    console.log('Conectado al servidor')
});
socket.on('disconnect', function() {
    console.log('Perdimos la conexión con el servidor')
});
socket.on('enviarMensaje', function(resp) {
    console.log('Servidor:', resp);
});
// Emitir eventos
socket.emit('enviarMensaje', {
    usuario: 'Juan Pablo',
    mensaje: 'Hola Mundo'
}, function(respCallback) {
    console.log('Servidor:', respCallback);
});