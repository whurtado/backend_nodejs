import { Router } from 'express';
//import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/Cliente.controller';
import ClienteController from '../controllers/ClienteController'
const router = Router();

//RUTAS CLIENTE
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getCliente);
router.post('/', ClienteController.createCliente);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);


export default router;