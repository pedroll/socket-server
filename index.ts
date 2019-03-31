
import bodyParser from "body-parser";
import compression = require("compression");
import cors from "cors";
import Debug = require("debug");
import Server from "./classes/server";
import * as enviroment from "./global/enviroment";
import router from "./routes/router";
const debug = Debug(enviroment.DEBUG);

const server = new Server();

server.app.use(compression());

// BodyParser antes de las rutas
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// cors antes de routes
// estamos permitiendo cualquier persona use servicio
server.app.use(cors({origin: true, credentials: true}));

// rutas servicios
server.app.use("/", router);

server.start (
    () => {
        debug(`Servidor corriendo en puerto ${enviroment.SERVER_PORT}`);
    },
);
