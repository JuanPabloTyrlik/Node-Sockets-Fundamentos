const { io } = require('../server');

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