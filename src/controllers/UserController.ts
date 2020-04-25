import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';
import { validate } from "class-validator";

class UserController { 

     static getUsers = async (req: Request, res: Response) => {
        //Get users from database
        const userRepository = getRepository(User);
        const users = await userRepository.find({
          select: ["id", "nombre", "email", "estado"]
        });
      
        //Retorna Un Objeto de usuarios
        res.json({
          ok: true,
          message: "Consulta exitosa",
          data: users
        });
      };
      
      static getUser = async (req: Request, res: Response) => {
        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
      
        //Se obtiene el usuario de la base de datos
        const userRepository = getRepository(User);
        try {
          const user = await userRepository.findOneOrFail(id, {
            select: ["id", "nombre", "email", "estado"]
          });
          
          res.json({
            ok: true,
            message: "Consulta exitosa",
            data: user
          });
        } catch (error) {
          res.status(404).send(`Usuario con id ${ id } no encontrado`);
        }
      };

    static createUser = async (req: Request, res: Response) => {
        //Se obtienen los parametros que llegan en el body
        let { nombre, email, password, estado } = req.body;
        let user      = new User();
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
        const userRepository = getRepository(User);
        try {
            const  results = await userRepository.save(user);

             //Si todo esta bien, responde 201
            res.status(201).json({
                ok: true,
                mensaje: "Usuario Creado Correctamente",
                usuario: results

            });

        } catch (e) {
          res.status(409).json({
            ok: false,
            mensaje: "EL email que intenta crear ya esta en uso"
          });
          return;
        }
      
        
      };

    static updateUser = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        //Se Toman los valores del body
        const { email, estado } = req.body;
      
        //Se busca el usuario ha actualizar en la base de datos
        const userRepository = getRepository(User);
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
          res.status(400).json({
                ok: false,
                message: errors
             });
          return;
        }
      
        //Intenta guardar, si falla, eso significa que el email ya está en uso
        try {
          await userRepository.save(user);
        } catch (e) {
          res.status(409).json({
              ok: false,
              message: "El Email que intenta guardar ya esta en uso"
            });
          return;
        }
        //Despues de Todo envia una respuesta 204
        res.status(204).json({
            ok: true,
            message: "Usuario actualizado correctamente"
          });
        };
      
      static deleteUser = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        const userRepository = getRepository(User);
        let user: User;
        try {
          user = await userRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).json({
                ok: false,
                message: "Usuario no encontrado"
              });
          return;
        }
        userRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).json({
                  ok: true,
                  message: "Usuario eliminado correctamente"
              });
      };
      

}

export default UserController;



