import Debug from 'debug';
import { Socket } from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';
// import Socketio from 'socket.io';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
};

export const desconexion = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        debug('Cliente desconectado', cliente.id);
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

        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
