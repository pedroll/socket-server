import {Request, Response, Router} from "express";

const router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
    res.json({
        ok: true,
        mensaje: "GET esta bien",
    });
});

router.post("/mensajes/:id", (req: Request, res: Response) => {

    // con el body parser recogemos los campos del body del request post
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    // recuperameos parametro en url
    const id = req.params.id;
    res.json({
        cuerpo,
        de,
        ok: true,
        id,
    });
});

export default router;
