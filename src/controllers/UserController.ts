import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
import { validate, ValidationError } from 'class-validator';
import ApiResponse from '../classes/ApiResponse';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';

class UserController {

   

     static getUsuarios = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(Usuario);
        const users = await userRepository.find({
          select: ["id", "nombre", "email", "estado"]
        });
 
        UserController.sendResponse(res, users);
      };
      
      static getUsuario = async (req: Request, res: Response) => {
        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
      
        //Se obtiene el usuario de la base de datos
        const userRepository = getRepository(Usuario);

        try {
            const user = await userRepository.findOneOrFail(id, {
                select: ["id", "nombre", "email", "estado"]
            });
            UserController.sendResponse(res, user);

        } catch (error) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_FOUND, false, `Usuario con id ${ id } no encontrado`);
        }
      };

    static createUsuario = async (req: Request, res: Response) => {
        //Se obtienen los parametros que llegan en el body
        let { nombre, email, password, estado } = req.body;
        let user      = new Usuario();
        user.nombre   = nombre;
        user.email    = email;
        user.password = password;
        user.estado   = estado;
      
        //Validade if the parameters are ok
        const errors = await validate(user);
        if (errors.length > 0) {
          UserController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, "error", errors);
          return;
        }
      
        //Hash the password, to securely store on DB
        user.hashPassword();
      
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(Usuario);
        try {
            const  results = await userRepository.save(user);
            UserController.sendResponse(res, results, HTTP_STATUS_CODE_CREATED, true, "Usuario Creado Correctamente");

        } catch (e) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_CONFLICT, false, e.message);
            return;
        }
      
      };
      
    /*static createUsuario = async (req: Request,res: Response): Promise<Response> => {
    const newUsuario = await getRepository(Usuario).create(req.body);
    const results = await getRepository(Usuario).save(newUsuario);
    return res.json(results);
    };*/

    static updateUsuario = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        //Se Toman los valores del body
        const { email, estado } = req.body;
      
        //Se busca el usuario ha actualizar en la base de datos
        const userRepository = getRepository(Usuario);
        let user;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_FOUND, false, "User not found");
            return;
        }
       
        //Validad los nuevos valores a guardar
        user.email = email;
        user.estado = estado;
        const errors = await validate(user);
        if (errors.length > 0) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, "error", errors);
            return;
        }
      
        //Intenta guardar, si falla, eso significa que el email ya está en uso
        try {
          await userRepository.save(user);
        } catch (e) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_CONFLICT, false, "El Email que intenta guardar ya esta en usos");
            return;
        }
        //Despues de Todo envia una respuesta 204
        UserController.sendResponse(res, null, HTTP_STATUS_CODE_NO_CONTENT, true, "Usuario actualizado");
      };
      
      static deleteUsuario = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        const userRepository = getRepository(Usuario);
        let user: Usuario;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
            UserController.sendResponse(res, null, HTTP_STATUS_CODE_NOT_FOUND, false, "Usuario no encontrado");
            return;
        }
        userRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        UserController.sendResponse(res, null, HTTP_STATUS_CODE_NO_CONTENT);
      };
      

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }

}

export default UserController;



