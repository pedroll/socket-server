import Debug from 'debug';
import nodemailer from 'nodemailer';
import * as environment from '../global/enviroment';

const debug = Debug(environment.DEBUG);

export const enviamail = (formulario: any) => {

    const transporter = nodemailer.createTransport({
        host: environment.MAILSERVER.host,
        port: environment.MAILSERVER.port,
        secure: environment.MAILSERVER.secure,
        auth: {
            user: environment.MAILSERVER.auth.user,
            pass: environment.MAILSERVER.auth.pass
        }
        // service: "gmail",
    });
    const mailOptions = {

        from: `"${ environment.MAILSERVER.from.name} <${environment.MAILSERVER.from.email}`, // sender address
        // from: `"${formulario.nombre} 👻" <${formulario.email}>`,
        // to: req.body.to, // list of receivers
        to: environment.MAILSERVER.to,
        subject: environment.MAILSERVER.subject,
        // subject: formulario.asunto,
        // subject: req.body.subject, // Subject line
        // text: formulario.body.body, // plain text body
        html: `
             <strong>Nme:</strong> ${formulario.pwGEmA7aB} <br/>
             <strong>Email:</strong> ${formulario.UeN3EqEgk} <br/>
             `
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            debug(err);
        } else {
            debug(info);
            debug('Message %s sent: %s', info.messageId, info.response);
        }
    });
};
