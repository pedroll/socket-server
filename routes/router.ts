import Debug from 'debug';
import { Request, Response, Router } from 'express';
import { Socket } from 'socket.io';
import { GraficaData } from '../classes/grafica';
import { GraficaData2 } from '../classes/grafica2';
import { Mapa } from '../classes/mapa';
import { Server } from '../classes/server';
import { enviamail } from '../email/email';
import * as environment from '../global/enviroment';
import { usuariosConectados } from '../socket/socket';

const debug = Debug(environment.DEBUG);

export const router = Router();

const grafica = new GraficaData();
const grafica2 = new GraficaData2();

router.get('/', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'GET esta bien'
    });
});

// aplicacion mapa
// exportamos mapa para poder acceder a la misma instancia
export const mapa = new Mapa();
const lugares = [
    {
        id: '1',
        nombre: 'Udemy',
        lat: 37.784679,
        lng: -122.395936
    },
    {
        id: '2',
        nombre: 'Bahía de San Francisco',
        lat: 37.798933,
        lng: -122.377732
    },
    {
        id: '3',
        nombre: 'The Palace Hotel',
        lat: 37.788578,
        lng: -122.401745
    }
];
mapa.marcadores.push(...lugares);

router.get('/mapa', (req: Request, res: Response) => {
    res.json(mapa.getMarcadores());
});

// aplicacion grafica
router.get('/grafica', (req: Request, res: Response) => {
    res.json(grafica.getDataGrafica());
});

router.post('/grafica', (req: Request, res: Response) => {

    const mes = req.body.mes;
    const unidades = Number(req.body.unidades);
    const server = Server.instance;

    grafica.incrementarValor(mes, unidades);
    // al recibir por el rest tambien emitimos el evento
    server.io.emit('cambio-grafica', grafica.getDataGrafica());

    res.json(grafica.getDataGrafica());
});

// aplicacion grafica encuesta
router.get('/grafica2', (req: Request, res: Response) => {
    res.json(grafica2.getDataGrafica());
});

router.post('/grafica2', (req: Request, res: Response) => {

    const opcion = req.body.opcion;
    const unidades = Number(req.body.unidades);
    const server = Server.instance;

    grafica2.incrementarValor(opcion, unidades);
    // al recibir por el rest tambien emitimos el evento
    server.io.emit('cambio-grafica', grafica2.getDataGrafica());

    res.json(grafica2.getDataGrafica());
});

// aplicacion chat
router.post('/mensajes/:id', (req: Request, res: Response) => {

    // con el body parser recogemos los campos del body del request post
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // recuperameos parametro en url
    const id = req.params.id;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    };
    server.io.in(id)
        .emit('mensaje-privado', payload);

    res.json({
        cuerpo,
        de,
        ok: true,
        id
    });
});

router.post('/enviamail', (req: Request, res: Response) => {

    debug(`Body:  + ${JSON.stringify(req.body)}`);
    const regexpNombre = new RegExp('^[a-zA-Z ]*$');
    const regexpEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$');

    if (
        // some validation
        !regexpNombre.test(req.body.pwGEmA7aB) ||
        !regexpEmail.test(req.body.UeN3EqEgk) ||
        req.body.name !== '') {
        res.status(404)
            .send();
        debug('rechazado');
    } else {
        enviamail(req.body);
        res.status(200)
            .send();
    }

});

// servicio para obtener todos los ids de los usuarios
router.get('/usuarios', (req: Request, res: Response) => {

    const server = Server.instance;

    server.io.clients((err: any, clientes: Array<string>) => {
        if (err) {
            debug(err);
            res.json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            clientes
        });
    });

});

// obtener usuarios con nombres y demas
// servicio para obtener todos los ids de los usuarios
router.get('/usuarios/detalle', (req: Request, res: Response) => {

    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});
