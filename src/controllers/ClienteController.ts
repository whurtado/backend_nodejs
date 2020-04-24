
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Cliente } from '../entities/Client';


class ClienteController {

    static getClientes = async (req: Request, res: Response): Promise<Response> =>{
        const cliente = await getRepository(Cliente).find();
        return res.json(cliente);
    }
    
    static getCliente = async (req: Request,res: Response): Promise<Response> => {
        const results = await getRepository(Cliente).findOne(req.params.id);
        return res.json(results);
      };
      
      static createCliente = async (req: Request,res: Response): Promise<Response> => {
        const newCliente = await getRepository(Cliente).create(req.body);
        const results = await getRepository(Cliente).save(newCliente);
        return res.json(results);
      };
      
      static updateCliente = async (req: Request,res: Response): Promise<Response> => {
        const cliente = await getRepository(Cliente).findOne(req.params.id);
        if (cliente) {
          getRepository(Cliente).merge(cliente, req.body);
          const results = await getRepository(Cliente).save(cliente);
          return res.json(results);
        }
      
        return res.json({msg: 'Not cliente found'});
      };
      
      static deleteCliente = async (req: Request, res: Response): Promise<Response> => {
        const results = await getRepository(Cliente).delete(req.params.id);
        return res.json(results);
      };

}





export default ClienteController;
