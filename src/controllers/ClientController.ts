
import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { Client } from '../entities/Client';
import ApiResponse from '../classes/ApiResponse';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { ValidationError, validate } from 'class-validator';



class ClientController {

    static options : FindManyOptions<Client> = {
        relations: ["status", "documenttype", "city"],
        order: {
            name: "ASC" 
        }
    };

    static getAllClients = async (req: Request, res: Response) => {
        const clientRepository = getRepository(Client);
        const clients = await clientRepository.find(ClientController.options);
       
        ClientController.sendResponse(res, clients);
    }

    static getOneClient = async (req: Request, res: Response) => {

        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
        //Se obtiene el cliente de la base de datos
        const clientRepository = getRepository(Client);
        try {
            const client = await clientRepository.findOneOrFail(id, ClientController.options);
            ClientController.sendResponse(res, client);
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_FOUND, false, `Cliente con id ${id} no encontrado`);
        }
    }    

    static createClient = async (req: Request, res: Response) => {
        console.log(req.body);

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
                throw new Error('Datos en el formulario invalidos');
            }
            console.log('grabar cliente');
            const clientRepository = getRepository(Client);
            const results = await clientRepository.save(client);

            ClientController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Cliente creado correctamente");
            
        } catch (error) {
            ClientController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }
}





export default ClientController;