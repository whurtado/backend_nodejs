import { Router } from 'express';
import ClientController from '../controllers/ClientController'
const router = Router();

//RUTAS CLIENTE
router.get('/', ClientController.getAllClients);
router.get('/:id', ClientController.getClient);
router.post('/pagination-filters/', ClientController.getAllClientsPaginated),
router.post('/', ClientController.createClient);
router.put('/:id', ClientController.updateClient);
// router.delete('/:id', ClientController.deleteClient);


export default router;