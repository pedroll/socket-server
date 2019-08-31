// si esta definido puerto en heroku process.env.PORT
export const debug = true;
export const DEBUG = debug ? 'socket-server' : '';

export const SERVER_PORT: number = Number(process.env.PORT) || 5000;

export const MAILSERVER = {
    host: 'xxxxx.com',
    port: 465,
    secure: true,
    auth: {
        user: 'xxxxx@xxxx.net',
        pass: 'xxxxxx'
    },
    from: {
        // for dev
        name: 'youname',
        email: 'your@email.xx'
    },
    to: 'xxxx@xxxx.com',
    subject: 'some subject for email'

};
