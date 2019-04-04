// import {Express} from "express";
import Debug from 'debug';
import express from 'express';
import http from 'http';
import Socketio from 'socket.io';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export class Server {

    app: express.Application;
    port: number;

    io: Socketio.Server;
    private httpServer: http.Server;

    constructor() {
        this.app = express();
        this.port = environment.SERVER_PORT;

        // podriamos acerlo con createServer
        this.httpServer = new http.Server(this.app);
        this.io = Socketio(this.httpServer);
        this.escucharSockets();
    }

    // en lugar del tipo Function es preferible () =>  void
    start(callback: () => void): void {
        debug(`servidor iniciado puerto ${this.port}`);

        // levantamos el httpserver en lugar del express
        // this.app.listen(this.port, callback);
        this.httpServer.listen(this.port, callback);
    }

    private escucharSockets(): void {
        debug('escuchando sockets');
        this.io.on('connection', cliente => {
            debug('nuevo cliente conectado');
        });
    }

}
