import { Router } from 'express';
import UserController from '../controllers/UserController';

const router = Router();

//RUTAS USUARIO
router.get('/', UserController.getUsers);
router.get('/:id', UserController.getUser);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;