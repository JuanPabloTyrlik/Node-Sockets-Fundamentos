const express = require('express');
const socketIO = require('socket.io');
const http = require('http');


const path = require('path');

const app = express();
const server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Comunicacion con backend
const io = socketIO(server);

io.on('connection', (client) => {
    console.log('Usuario conectado');
    // Escuchar eventos del cliente
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    client.on('enviarMensaje', (mensaje, callback) => {
        console.log('Cliente:', mensaje);
        if (mensaje.usuario) {
            callback({
                ok: true,
                mensaje: 'Salió todo bien'
            });
        } else {
            callback({
                ok: false,
                mensaje: 'Algo salió mal'
            });
        }
    });
    // Enviar evento
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a la aplicación'
    });
});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});