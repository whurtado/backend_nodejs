import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  //Se obtiene el tokenque llega en la cabecera
  //const token = <string>req.headers["auth"];
  const token = <string>req.headers.auth;

  let jwtPayload;

  //Intenta validar el token y obtener datos
  try {
    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    console.log("payload-",jwtPayload);

    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    //Si el token no es válido, responda con 401 (no autorizado)
    //res.status(401).send();
    res.status(401).json({
      ok: false,
      mensaje : 'Token invalido'
    });

    return;
  }

  //El token es valido por una Hora
  //Queremos enviar un nuevo token en cada solicitud
  const { userId, email } = jwtPayload;
  const newToken = jwt.sign({ userId, email }, config.jwtSecret, {
    expiresIn: "1h"
  });
  res.setHeader("token", newToken);

  //Llama al middleware o al controlador
  next();
};
