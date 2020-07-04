
import { Request, Response} from 'express';
import { getRepository, FindManyOptions, Like } from 'typeorm';
import { ValidationError, validate } from 'class-validator';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import ApiResponse from '../classes/ApiResponse';
import PaginateData from '../classes/PaginateData';
import { Client } from '../entities/Client';
import DataNotFoundError from '../classes/errors/DataNotFoundError';


class ClientController {

    static options : FindManyOptions<Client> = {
        relations: ["status", "documenttype", "city", "city.department"],
        order: {
            name: "ASC" 
        }
    };

    static getAllClients = async (req: Request, res: Response) => {
        const clientRepository = getRepository(Client);
        try {
            const data = await clientRepository.find(ClientController.options);
            ClientController.sendResponse(res, data);
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getAllClientsPaginated = async (req: Request, res: Response) => {
        console.log('getAllClientsPaginated ->  body: ', req.body);
        try {
            const where = ClientController.getWhere(req);
            const data = await PaginateData.paginator(req, Client, {
                relations: ["status", "documenttype", "city", "city.department"],
                where,
                order: {
                    name: "ASC" 
                }
            });
            ClientController.sendResponse(res, data);
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    private static getWhere (req: Request) {
        let where: any = {};
        if(req.body.filters !== undefined){
            if(req.body.filters.name !== null && req.body.filters.name !== ''){
                let name : string = req.body.filters.name;
                console.log('where name: ', name);
                where.name = Like("%"+ name.toUpperCase() +"%");
            }
            if(req.body.filters.documenttype !== null && req.body.filters.documenttype !== ''){
                where.documenttype = req.body.filters.documenttype;
            }
            if(req.body.filters.documentnumber !== null && req.body.filters.documentnumber !== ''){
                where.documentnumber = req.body.filters.documentnumber;
            }
            if(req.body.filters.city !== null && req.body.filters.city !== ''){
                where.city = req.body.filters.city;
            }
            if(req.body.filters.status !== null && req.body.filters.status !== ''){
                where.status = req.body.filters.status;
            }
            if(req.body.filters.department !== null && req.body.filters.department !== ''){
                //where.city.department.id = req.body.filters.department;
            }
        }
        return where;
    }

    static getClient = async (req: Request, res: Response) => {
        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
        console.log('id cliente: ', id);
        console.log('options: ', ClientController.options);
        //Se obtiene el cliente de la base de datos
        const clientRepository = getRepository(Client);
        try {
            const client = await clientRepository.findOne(id, ClientController.options);
            if(client===undefined){
                let error = new DataNotFoundError();
                error.message = `Cliente con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }
            ClientController.sendResponse(res, client);
        } catch (error) {
            if(error instanceof DataNotFoundError){
                ClientController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }    

    static createClient = async (req: Request, res: Response) => {
       
        try {
            let {
                name, 
                documenttype, 
                documentnumber, 
                city, 
                homeaddres, 
                phone, 
                email,
                status,
                observations
            } : Client = req.body;

            let client = new Client();
            client.name = name.toUpperCase();
            client.documenttype = documenttype ;
            client.documentnumber = documentnumber;
            client.city = city;
            client.homeaddres = homeaddres.toUpperCase();
            client.phone = phone;
            client.email = email;
            client.status = status;
            client.observations = observations.toUpperCase();

            //Validade if the parameters are ok
            const errors = await validate(client);
            if (errors.length > 0) {
                console.log(errors);
                throw new Error('Datos no validos');
            }
            console.log('grabar cliente');
            const clientRepository = getRepository(Client);
            const results = await clientRepository.save(client);

            ClientController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Cliente creado correctamente");
            
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static updateClient = async(req: Request, res: Response) => {
        try {
            const id = req.params.id;
            const {
                name, 
                documenttype, 
                documentnumber, 
                city, 
                homeaddres, 
                phone, 
                email,
                status,
                observations
            } : Client = req.body;

            const clientRepository = getRepository(Client);

            let client = await clientRepository.findOne(id);

            if(client===undefined){
                let error = new DataNotFoundError();
                error.message = `Cliente con id ${id} no encontrado`;
                error.statusCode = HTTP_STATUS_CODE_NOT_FOUND;
                throw error;
            }

            client.name = name.toUpperCase();
            client.documenttype = documenttype ;
            client.documentnumber = documentnumber;
            client.city = city;
            client.homeaddres = homeaddres.toUpperCase();
            client.phone = phone;
            client.email = email;
            client.status = status;
            client.observations = observations.toUpperCase();

            //Validade if the parameters are ok
            const errors = await validate(client);
            if (errors.length > 0) {
                console.log(errors);
                throw new Error('Datos no validos');
            }
           
            const result = await clientRepository.save(client);
        
            ClientController.sendResponse(res, result, HTTP_STATUS_CODE_OK, true, "Cliente actualizado correctamente");
            
        } catch (error) {
            if(error instanceof DataNotFoundError){
                ClientController.sendResponse(res, null, error.statusCode, false, error.message);
            }else{
                ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }
}

export default ClientController;
