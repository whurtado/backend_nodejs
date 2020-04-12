import { Router } from 'express';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/Usuario.controller';
import UserController from '../controllers/UserController';

const router = Router();

//RUTAS USUARIO
router.get('/', UserController.getUsuarios);
router.get('/:id', UserController.getUsuario);
router.post('/', UserController.createUsuario);
router.put('/:id', UserController.updateUsuario);
router.delete('/:id', UserController.deleteUsuario);

export default router;