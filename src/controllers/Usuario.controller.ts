import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Usuario } from '../entities/Usuario';

export const getUsuarios = async (req: Request, res: Response): Promise<Response> =>{
    const usuario = await getRepository(Usuario).find();
    return res.json(usuario);
}

export const getUsuario = async (req: Request,res: Response): Promise<Response> => {
    const results = await getRepository(Usuario).findOne(req.params.id);
    return res.json(results);
  };
  
  export const createUsuario = async (req: Request,res: Response): Promise<Response> => {
    const newUsuario = await getRepository(Usuario).create(req.body);
    const results = await getRepository(Usuario).save(newUsuario);
    return res.json(results);
  };
  
  export const updateUsuario = async (req: Request,res: Response): Promise<Response> => {
    const usuario = await getRepository(Usuario).findOne(req.params.id);
    if (usuario) {
      getRepository(Usuario).merge(usuario, req.body);
      const results = await getRepository(Usuario).save(usuario);
      return res.json(results);
    }
  
    return res.json({msg: 'Not usuario found'});
  };
  
  export const deleteUsuario = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Usuario).delete(req.params.id);
    return res.json(results);
  };

