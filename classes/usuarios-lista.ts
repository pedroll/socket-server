import Debug from 'debug';
import * as environment from '../global/enviroment';
import { Usuario } from './usuario';

const debug = Debug(environment.DEBUG);

export class UsuariosLista {

    private lista: Array<Usuario> = [];

    agregarUsuario(usuario: Usuario): Usuario {
        this.lista.push(usuario);
        debug('lista', this.lista);

        return usuario;
    }

    actualizarNombre(id: string, nombre: string): void {

        for (const usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }

        debug('======== Actualizando usuario ===========');
        debug(this.lista);
    }

    getLista(): Array<Usuario> {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }

    getUsuario(id: string): Usuario | void {
        return this.lista.find(usuario => usuario.id === id);
    }

    getUsuariosSala(sala: string): Array<Usuario> | void {
        return this.lista.filter(usuario => usuario.sala === sala);
    }

    borrarUsuario(id: string): void | Usuario {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario !== tempUsuario);
        debug('Usuario borrado', tempUsuario);

        return tempUsuario;
    }
}
