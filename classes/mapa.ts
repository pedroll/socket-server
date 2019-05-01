import Debug from 'debug';
import * as environment from '../global/enviroment';
import { Marcador } from './marcador';

const debug = Debug(environment.DEBUG);

export class Mapa {

    // todo revert to private, cambiado para ejemplo
    marcadores: Array<Marcador> = [];

    getMarcadores(): Array<Marcador> {
        return this.marcadores;
    }

    agregarMarcador(marcador: Marcador): void {
        this.marcadores.push(marcador);
        debug('agragado marcador');
    }

    borrarMarcador(marcador: Marcador): void {
        this.marcadores = this.marcadores.filter(mark => mark.id !== marcador.id);
    }

    moverMarcador(marcador: Marcador): void {
        for (const i in this.marcadores) {
            if (this.marcadores[i].id === marcador.id) {
                this.marcadores[i].lat = marcador.lat;
                this.marcadores[i].lng = marcador.lng;
                break;
            }
        }
    }

}
