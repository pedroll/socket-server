// import {Express} from "express";
import Debug from 'debug';
import express from 'express';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export class Server {

    app: express.Application;
    port: number;

    constructor() {
        this.app = express();
        this.port = environment.SERVER_PORT;
    }

    // en lugar del tipo Function es preferible () =>  void
    start(callback: () => void): void {
        debug(`servidor iniciado puerto ${this.port}`);
        this.app.listen(this.port, callback);
    }

}
