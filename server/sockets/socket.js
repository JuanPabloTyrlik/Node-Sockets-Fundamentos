const { io } = require('../server');

io.on('connection', (client) => {
    console.log('Usuario conectado');
    // Escuchar eventos del cliente
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
    client.on('enviarMensaje', (data, callback) => {
        console.log('Cliente:', data);
        client.broadcast.emit('enviarMensaje', data);
        // if (data.usuario) {
        //     callback({
        //         ok: true,
        //         data: 'Salió todo bien'
        //     });
        // } else {
        //     callback({
        //         ok: false,
        //         data: 'Algo salió mal'
        //     });
        // }
    });
    // Enviar evento
    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a la aplicación'
    });
});