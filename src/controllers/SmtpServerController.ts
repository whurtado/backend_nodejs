import { Request, Response } from 'express';
import { getRepository, Like } from 'typeorm';
import { ValidationError, validate } from 'class-validator';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { SmtpServer } from '../entities/SmtpServer';
import PaginateData from '../classes/PaginateData';
import ApiResponse from '../classes/ApiResponse';
import DataNotFoundError from '../classes/errors/DataNotFoundError';


class SmtpServerController {

    static getAllSmtpServers = async (req: Request, res: Response) => {
        const smtpServerRepository = getRepository(SmtpServer);
        try {
            const data = await smtpServerRepository.find();
            SmtpServerController.sendResponse(res, data);
        } catch (error) {
            SmtpServerController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getAllSmtpServersPaginated = async (req: Request, res: Response) => {
        console.log('getAllSmtpServerPaginated ->  body: ', req.body);
        try {
            const where = SmtpServerController.getWhere(req);
            const data = await PaginateData.paginator(req, SmtpServer, {
                where,
                order: {
                    name: "ASC" 
                }
            });
            SmtpServerController.sendResponse(res, data);
        } catch (error) {
            SmtpServerController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    private static getWhere (req: Request) {
        let where: any = {};
        if(req.body.filters !== undefined){
            if(req.body.filters.host !== null && req.body.filters.host !== ''){
                let host : string = req.body.filters.host;
                console.log('where host: ', host);
                where.host = Like("%"+ host +"%");
            }

            if(req.body.filters.user !== null && req.body.filters.user !== ''){
                let user : string = req.body.filters.user;
                console.log('where user: ', user);
                where.user = Like("%"+ user +"%");
            }

            if(req.body.filters.port !== null && req.body.filters.port !== ''){
                where.port = req.body.filters.port;
            }
        }
        return where;
    }

    static getSmtpServer = async (req: Request, res: Response) => {
        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
        console.log('id SmtpServer: ', id);
        //Se obtiene la configuración del servidor SMTP de la base de datos
        const smtpServerRepository = getRepository(SmtpServer);
        try {
            const data = await smtpServerRepository.findOne(id);
            if(data===undefined){
                let error = new DataNotFoundError();
                error.message = `Servidor SMTP con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            SmtpServerController.sendResponse(res, data);
        } catch (error) {
            if(error instanceof DataNotFoundError){
                SmtpServerController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                SmtpServerController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    } 
    
    static createSmtpServer = async (req: Request, res: Response) => {
       
        try {
            let {
                host, 
                port, 
                user, 
                password
            } : SmtpServer = req.body;

            let smtpServer = new SmtpServer();
            smtpServer.host = host;
            smtpServer.port = port;
            smtpServer.user = user;
            smtpServer.password = password;

            //Validade if the parameters are ok
            const errors = await validate(smtpServer);
            if (errors.length > 0) {
                console.log(errors);
                throw new Error('Datos no validos');
            }
            console.log('grabar smtpServer');
            const smtpServerRepository = getRepository(SmtpServer);
            const results = await smtpServerRepository.save(smtpServer);

            SmtpServerController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Servidor SMTP creado correctamente");
            
        } catch (error) {
            SmtpServerController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static updateSmtpServer = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            let {
                host, 
                port, 
                user, 
                password
            } : SmtpServer = req.body;

            const smtpServerRepository = getRepository(SmtpServer);

            let smtpServer = await smtpServerRepository.findOne(id);

            if(smtpServer===undefined){
                let error = new DataNotFoundError();
                error.message = `Servidor SMTP con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            smtpServer.host = host;
            smtpServer.port = port;
            smtpServer.user = user;
            smtpServer.password = password;

            //Validade if the parameters are ok
            const errors = await validate(smtpServer);
            if (errors.length > 0) {
                console.log(errors);
                throw new Error('Datos no validos');
            }
           
            const result = await smtpServerRepository.save(smtpServer);
        
            SmtpServerController.sendResponse(res, result, HTTP_STATUS_CODE_OK, true, "Servidor SMTP actualizado correctamente");
            
        } catch (error) {
            if(error instanceof DataNotFoundError){
                SmtpServerController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                SmtpServerController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }

}

export default SmtpServerController;