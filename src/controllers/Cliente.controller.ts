import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Cliente } from '../entities/Cliente';

export const getClientes = async (req: Request, res: Response): Promise<Response> =>{
    const cliente = await getRepository(Cliente).find();
    return res.json(cliente);
}

export const getCliente = async (req: Request,res: Response): Promise<Response> => {
    const results = await getRepository(Cliente).findOne(req.params.id);
    return res.json(results);
  };
  
  export const createCliente = async (req: Request,res: Response): Promise<Response> => {
    const newCliente = await getRepository(Cliente).create(req.body);
    const results = await getRepository(Cliente).save(newCliente);
    return res.json(results);
  };
  
  export const updateCliente = async (req: Request,res: Response): Promise<Response> => {
    const cliente = await getRepository(Cliente).findOne(req.params.id);
    if (cliente) {
      getRepository(Cliente).merge(cliente, req.body);
      const results = await getRepository(Cliente).save(cliente);
      return res.json(results);
    }
  
    return res.json({msg: 'Not cliente found'});
  };
  
  export const deleteCliente = async (req: Request, res: Response): Promise<Response> => {
    const results = await getRepository(Cliente).delete(req.params.id);
    return res.json(results);
  };

