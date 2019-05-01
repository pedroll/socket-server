import Debug from 'debug';
import { Socket } from 'socket.io';
import { Usuario } from '../classes/usuario';
import { UsuariosLista } from '../classes/usuarios-lista';

// import Socketio from 'socket.io';
import * as environment from '../global/enviroment';
import { mapa } from '../routes/router';

const debug = Debug(environment.DEBUG);
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
};

export const desconexion = (cliente: Socket, io: Socket['server']) => {

    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario(cliente.id);
        debug('Cliente desconectado', cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista());
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
        io.emit('usuarios-activos', usuariosConectados.getLista());

        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};

// obbtener usuarios
export const obtenerrUsuario = (cliente: Socket, io: Socket['server']) => {

    cliente.on('obtener-usuarios', () => {
        debug('Obteniendo Usuarios');
        // emitiendo solo al sender
        io.to(cliente.id)
            .emit('usuarios-activos', usuariosConectados.getLista());
    });

};

// agregar marcador
// es necesario el cliente por que es nesario escucharlo
// y io para emitir al resto
export const marcadorNuevo = (cliente: Socket) => {

    cliente.on('marcadorNuevo', payload => {
        debug('Nuevo marcador recibido', payload);
        mapa.agregarMarcador(payload);
        // emitimos a todos meno al remitente
        debug('emitiendo marcadorNuevo', payload);
        // si volbemos a emitir duplicamos el objeto por que lo escucha el que lo emite
        // io.emit('marcadorNuevo', payload);
        cliente.broadcast.emit('marcadorNuevo', payload);
    });

};
