import { Response, Request} from 'express';
import { getRepository } from 'typeorm';
import { Role } from '../entities/Role';
import { validate } from 'class-validator'
import { Permission } from '../entities/Permission';

class RoleController {

    static getRoles = async (req: Request, res: Response) => {
        //Get users from database
        const roleRepository = getRepository(Role);
        const role = await roleRepository.find({
            relations: ["permissions"]
        });
      
        //Retorna Un Objeto de usuarios
        res.json({
            ok: true,
            message: "Consulta exitosa",
            data: role
        });
      };
      
      static getRole = async (req: Request, res: Response) => {
        //Se obtiene el id que llega por parametro en la url
        const id: string = req.params.id;
      
        //Se obtiene el rol de la base de datos
        const roleRepository = getRepository(Role);
        try {
          const role = await roleRepository.findOneOrFail(id, {
            relations: ["permissions"]
            });

            res.json({
                ok: true,
                message: "Consulta exitosa",
                data: role
            });

        } catch (error) {
          res.status(404).json({
            ok: false,
            message: `Rol con id ${ id } no encontrado`
          });
        }
      };

    static createRole = async (req: Request, res: Response) => {

        //Se obtienen los parametros que llegan en el body
        let { name, description, permission } = req.body;

        let role          = new Role();
        role.name         = name;
        role.description  = description;
        role.permissions = permission;
      
        //Validade if the parameters are ok
        const errors = await validate(role);
        if (errors.length > 0) {
          res.status(400).json({
            ok: false,
            message: errors
          });
          return;
        }
            
        //Try to save. If fails, the username is already in use
        const userRepository = getRepository(Role);
        try {
            const  results = await userRepository.save(role);

             //Si todo esta bien, responde 201
            res.status(201).json({
                ok: true,
                mensaje: "Rol Creado Correctamente",
                data: results
            });

        } catch (e) {
          res.status(409).json({
            ok: false,
            mensaje: "EL rol que intenta crear ya esta en uso"
          });
          return;
        }
              
      };

      static updateRole = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        //Se Toman los valores del body
        const { name, description, permission } = req.body;
      
        //Se busca el usuario ha actualizar en la base de datos
        const roleRepository = getRepository(Role);
        let role;
        try {
            role = await roleRepository.findOneOrFail(id);
        } catch (error) {
          //Si no encuentra al usuario, responde 404
          res.status(404).json({
                            ok: false,
                            message: "Rol no encontrado"
                        });
          return;
        } 

        //Valida los nuevos valores a guardar
        role.name         = name;
        role.description  = description;
        role.permissions = permission;

        const errors = await validate(role);
        if (errors.length > 0) {
          res.status(400).json({
                            ok: false,
                            message: errors
                        });
          return;
        }
      
        //Intenta guardar, si falla, eso significa que el email ya está en uso
        try {
          await roleRepository.save(role);
        } catch (e) {
          res.status(409).json({
            ok: false,
            message: "El nombre del rol que intenta guardar ya esta en uso"
          });
          return;
        }
        //Despues de Todo envia una respuesta 204
        res.status(204).json({
            ok: true,
            message: "Rol actualizado correctamente"
        });
      };
      
      static deleteRole = async (req: Request, res: Response) => {
        //Se obtiene el id que viene en la url
        const id = req.params.id;
      
        const roleRepository = getRepository(Role);
        let role: Role;
        try {
          role = await roleRepository.findOneOrFail(id);
        } catch (error) {
          res.status(404).json({
              ok: false,
              message: "Rol no encontrado"
          });
          return;
        }
        roleRepository.delete(id);
      
        //After all send a 204 (no content, but accepted) response
        res.status(204).json({
            ok: true,
            message: "Rol eliminado correctamente"
        });
      };

}

export default RoleController;