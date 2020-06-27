
import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { Client } from '../entities/Client';
import ApiResponse from '../classes/ApiResponse';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { ValidationError, validate } from 'class-validator';
import PaniteData from '../classes/PaginateData';



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
            const clients = await clientRepository.find(ClientController.options);
            ClientController.sendResponse(res, clients);
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static getAllClientsPaginated = async (req: Request, res: Response) => {
        try {
            const data = await PaniteData.paginator(req, Client, {
                relations: ["status", "documenttype", "city", "city.department"],
                order: {
                    name: "ASC" 
                }
            });
            ClientController.sendResponse(res, data);
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
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
                let error = new Error();
                error.message = `Cliente con id ${id} no encontrado`;
                error.name = HTTP_STATUS_CODE_NOT_FOUND.toString();
                throw error;
            }
            ClientController.sendResponse(res, client);
        } catch (error) {
            if(error instanceof Error){
                ClientController.sendResponse(res, null, parseInt(error.name), false, error.message);
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
            } = req.body;

            let client = new Client();
            client.name = name ;
            client.documenttype = documenttype ;
            client.documentnumber = documentnumber;
            client.city = city;
            client.homeaddres = homeaddres;
            client.phone = phone;
            client.email = email;
            client.status = status;
            client.observations = observations;

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
            } = req.body;

            const clientRepository = getRepository(Client);

            let client = await clientRepository.findOne(id);

            if(client===undefined){
                let error = new Error();
                error.message = `Cliente con id ${id} no encontrado`;
                error.name = HTTP_STATUS_CODE_NOT_FOUND.toString();
                throw error;
            }

            client.name = name ;
            client.documenttype = documenttype ;
            client.documentnumber = documentnumber;
            client.city = city;
            client.homeaddres = homeaddres;
            client.phone = phone;
            client.email = email;
            client.status = status;
            client.observations = observations;

            //Validade if the parameters are ok
            const errors = await validate(client);
            if (errors.length > 0) {
                console.log(errors);
                throw new Error('Datos no validos');
            }
           
            const result = await clientRepository.save(client);
        
            ClientController.sendResponse(res, result, HTTP_STATUS_CODE_OK, true, "Cliente actualizado correctamente");
            
        } catch (error) {
            if(error instanceof Error){
                ClientController.sendResponse(res, null, parseInt(error.name), false, error.message);
            }else{
                ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
            }
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        new ApiResponse(response, code, ok, message, data, validationError);
    }
}





export default ClientController;
