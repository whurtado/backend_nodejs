import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entities/Usuario';
import { validate } from "class-validator";

class UserController {

     static getUsuarios = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(Usuario);
        const users = await userRepository.find({
          select: ["id", "nombre", "email", "estado"]
        });
      
        //Retorna Un Objeto de usuarios
        res.send(users);
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
          res.send(user);
        } catch (error) {
          res.status(404).send(`Usuario con id ${ id } no encontrado`);
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
          res.status(400).send(errors);
          return;
        }
      
        //Hash the password, to securely store on DB
        user.hashPassword();
      
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(Usuario);
        try {
            const  results = await userRepository.save(user);

             //Si todo esta bien, responde 201
            res.status(201).json({
                ok: true,
                mensaje: "Usuario Creado Correctamente",
                usuario: results

            });

        } catch (e) {
          res.status(409).send("username already in use");
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
          //Si no encuentra al usuario, responde 404
          res.status(404).send("User not found");
          return;
        }
       
        //Validad los nuevos valores a guardar
        user.email = email;
        user.estado = estado;
        const errors = await validate(user);
        if (errors.length > 0) {
          res.status(400).send(errors);
          return;
        }
      
        //Intenta guardar, si falla, eso significa que el email ya está en uso
        try {
          await userRepository.save(user);
        } catch (e) {
          res.status(409).send("El Email que intenta guardar ya esta en uso");
          return;
        }
        //Despues de Todo envia una respuesta 204
        res.status(204).send();
      };
      
      static deleteUsuario = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        const userRepository = getRepository(Usuario);
        let user: Usuario;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).send("Usuario no encontrado");
          return;
        }
        userRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).send();
      };
      

}

export default UserController;



