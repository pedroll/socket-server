import Debug from 'debug';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export class Tickets {

    // todo revert to private, cambiado para ejemplo
    private listaTickets: Array<any> = [
        {
            id: 1,
            numero: 200,
            escritorio: 10
        },
        {
            id: 2,
            numero: 201,
            escritorio: 11
        },
        {
            id: 3,
            numero: 202,
            escritorio: 12
        }];

    // patron singleton
    private static _instance: Tickets;

    static get instance(): Tickets {
        return this._instance || (this._instance = new Tickets());
    }

    private _ticketsAsignados: Array<number> = [];

    get ticketsAsignados(): Array<number> {
        return this._ticketsAsignados;
    }

    set ticketsAsignados(value: Array<number>) {
        this._ticketsAsignados = value;
    }

    get getlistaTickets(): Array<number> {
        return this.listaTickets;
    }

    set ticketsPendientes(value: Array<number>) {
        this.listaTickets = value;
    }

    getTicketsPendientes(): Array<number> {
        return this.listaTickets;
    }

    agregarTicketPendientes(ticket: number): void {
        this.listaTickets.push(ticket);
        debug('agregado ticketsPendientes');
    }

    asignarTicket(): void {
        const ticket = this.listaTickets.shift();
        if (ticket) {
            this._ticketsAsignados.push(ticket);
        }
    }

}
