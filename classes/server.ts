// import {Express} from "express";
import Debug from 'debug';
import express from 'express';
import http from 'http';
import Socketio from 'socket.io';
import * as environment from '../global/enviroment';

import * as socket from '../socket/socket';

const debug = Debug(environment.DEBUG);

export class Server {

    private static _instance: Server;

    app: express.Application;
    port: number;

    io: Socketio.Server;
    private httpServer: http.Server;

    // en lugar del tipo Function es preferible () =>  void
    start(callback: () => void): void {
        debug(`servidor iniciado puerto ${this.port}`);

        // levantamos el httpserver en lugar del express
        // this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);
    }

    // private para no poder crear instancia  llamando a la clase
    private constructor() {

        this.app = express();
        this.port = environment.SERVER_PORT;

        // podriamos acerlo con createServer
        this.httpServer = new http.Server(this.app);
        this.io = Socketio(this.httpServer);
        this.escucharSockets();
    }

    // ptron singelton para no poder crear nuevas instancias de io
    static get instance(): Server {
        return this._instance || (this._instance = new Server());
    }

    private escucharSockets(): void {
        debug('escuchando sockets');
        this.io.on('connection', cliente => {

            debug('Cliente conectado');

            // cliente.on('disconnect', () => {
            //     debug('Cliente desconectado');
            // });
            socket.desconexion(cliente);
        });
    }
}
