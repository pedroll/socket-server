import Debug from 'debug';
import {Socket} from 'socket.io';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export const desconexion = (cliente: Socket) => {

    cliente.on('disconnect', () => {
        debug('Cliente desconectado');
    });

};
