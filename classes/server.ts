// import {Express} from "express";
import express = require("express");
import * as enviroment from "../global/enviroment";

export default class Server {

    public app: express.Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = enviroment.SERVER_PORT;
    }

    // en lugar del tipo Function es preferible () =>  void
    public start(callback: () => void) {
        this.app.listen(this.port, callback);
    }

}
