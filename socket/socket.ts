import Debug from 'debug';
import {Socket} from 'socket.io';
// import Socketio from 'socket.io';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export const desconexion = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        debug('Cliente desconectado');
    });

};

// escuchar mensaje
// recibimos el servidor como argumento
export const mensaje = (cliente: Socket, io: Socket['server']) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }) => {
        debug('Mensaje recibido', payload);
        // emitimos a todos meno al remitente
        io.emit('mensaje-nuevo', payload);
    });

};

// configurarusuario

export const configurerUsuario = (cliente: Socket, io: Socket['server']) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback: Function) => {
        debug('Configurando Usuario', payload.nombre);
        // emitimos a todos meno al remitente
        // io.emit('usuario-nuevo', payload);
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
