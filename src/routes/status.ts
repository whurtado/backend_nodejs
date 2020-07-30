import { Router } from 'express';
import StatusController from '../controllers/StatusController'
const router = Router();

//RUTAS CLIENTE
router.get('/', StatusController.getAllStatus);
router.get('/client/', StatusController.getAllStatusOfClientModule);
router.get('/module/:id', StatusController.getAllStatusByModule);


// router.get('/:id', StatusController.getOneStatus);
// router.post('/', StatusController.createStatus);
// router.put('/:id', ClientController.updateStatus);
// router.delete('/:id', ClientController.deleteStatus);


export default router;