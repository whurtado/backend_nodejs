
import { Request, Response} from 'express';
import { getRepository } from 'typeorm';
import { Client } from '../entities/Client';


class ClienteController {

    static getClientes = async (req: Request, res: Response): Promise<Response> =>{
        const cliente = await getRepository(Client).find();
        return res.json(cliente);
    }
    
    static getCliente = async (req: Request,res: Response): Promise<Response> => {
        const results = await getRepository(Client).findOne(req.params.id);
        return res.json(results);
      };
      
      static createCliente = async (req: Request,res: Response): Promise<Response> => {
        const newCliente = await getRepository(Client).create(req.body);
        const results = await getRepository(Client).save(newCliente);
        return res.json(results);
      };
      
      static updateCliente = async (req: Request,res: Response): Promise<Response> => {
        const cliente = await getRepository(Client).findOne(req.params.id);
        if (cliente) {
          getRepository(Client).merge(cliente, req.body);
          const results = await getRepository(Client).save(cliente);
          return res.json(results);
        }
      
        return res.json({msg: 'Not cliente found'});
      };
      
      static deleteCliente = async (req: Request, res: Response): Promise<Response> => {
        const results = await getRepository(Client).delete(req.params.id);
        return res.json(results);
      };

}





export default ClienteController;
