import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import Debug from 'debug';
import logger from 'morgan';
import { Server } from './classes/server';
import * as environment from './global/enviroment';
import { router } from './routes/router';

const debug = Debug(environment.DEBUG);

// instacciamos mediante el metodo segun patron singleton
const server = Server.instance;

server.app.use(logger('dev'));

server.app.use(compression());

// BodyParser antes de las rutas
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// cors antes de routes
// estamos permitiendo cualquier persona use servicio
server.app.use(cors({origin: true, credentials: true}));

// rutas servicios
server.app.use('/', router);

server.start (
    () => {
        debug(`Servidor corriendo en puerto ${environment.SERVER_PORT}`);
    }
);
