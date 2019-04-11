import Debug from 'debug';
import { Request, Response, Router } from 'express';
import { Socket } from 'socket.io';
import { GraficaData } from '../classes/grafica';
import { Server } from '../classes/server';
import { enviamail } from '../email/email';
import * as environment from '../global/enviroment';
import { usuariosConectados } from '../socket/socket';

const debug = Debug(environment.DEBUG);

export const router = Router();

const grafica = new GraficaData();

router.get('/', (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: 'GET esta bien'
    });
});

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
