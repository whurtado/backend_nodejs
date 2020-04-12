import 'reflect-metadata';
import Server from './classes/server';
//import router from './routes';
import routes from "./routes";

import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import {createConnection} from 'typeorm'

const server = new Server();

//se inicia la conexion a la base de datos
createConnection();

//morgan para evaluar las peticiones que llegan al api
server.app.use(morgan('dev'))

// BodyParser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use( bodyParser.json() );

// CORS
//server.app.use( cors({ origin: true, credentials: true  }) );
var corsOptions = {
    origin: "http://localhost:8081"
};

server.app.use(cors(corsOptions));

//se define el path dela aplicacion de donde se van a llamar las rutas
server.app.use('/api/', routes);





//llamado a las apis

server.start (() => {
    console.log(`Servidor corriendo en el puerto ${ server.port }`)
})
