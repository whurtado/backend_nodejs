import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import { validate } from "class-validator";

import { User } from '../entities/User';
import config from "../config/config";

class AuthController {
    
  static login = async (req: Request, res: Response) => {
    //checkear si llega el email y el password
    let { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).send();
    }

    //Obtener el usuario de la base de datos
    const userRepository = getRepository(User);
    let user: User ;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });

      //Checkear si el password esta encriptado
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            res.status(401).send();
            return;
        }

        //Genera el token, Es valido por Una Hora
        const token = jwt.sign(
            { userId: user.id, email: user.email },
            config.jwtSecret,
            { expiresIn: "1h" }
        );
    
        //Envia el token  jwt en la respuesta
        res.send(token);

    } catch (error) {
      res.status(401).send();
    }

        
  };

  static changePassword = async (req: Request, res: Response) => {

    //Obtiene el id para JWT
    const id = res.locals.jwtPayload.userId;

    //Obtiene los parametros que llegan en el body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).json({
        ok: false,
        mensaje: 'El campo password (nueva y vieja ) son obligatorios'
      });
    }

    //Obtiene el usuario de la base de datos
    const userRepository = getRepository(User);

    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);

      console.log("ingrese usaaaer ----",user);

      //Checkea si el password esta encriptado
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
        res.status(401).send();
        return;
      }
  
      //Valida la longitud del password de acuerdo al modelo Usuario
      user.password = newPassword;
      const errors = await validate(user);
      if (errors.length > 0) {
        res.status(400).send(errors);
        return;
      }
      //Valida la nueva contraseña y la guarda
      user.hashPassword();
      userRepository.save(user);
  
      res.status(204).send({
        ok: true,
        mensaje: 'Password actualizado sactisfactorimente'
      });


    } catch (id) {
      res.status(401).send();
    }

    
  };
}

export default AuthController;
