
// import * as Debug from "debug";
import Debug = require("debug");
import Server from "./classes/server";
import * as enviroment from "./global/enviroment";
import router from "./routes/router";
const debug = Debug(enviroment.DEBUG);

const server = new Server();
server.app.use("/", router);
server.start (
    () => {
        debug(`Servidor corriendo en puerto ${enviroment.SERVER_PORT}`);
    },
);
