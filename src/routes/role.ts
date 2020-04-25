import { Router } from 'express';
import RoleController from '../controllers/RoleController';

const router = Router();

//RUTAS USUARIO
router.get('/', RoleController.getRoles);
router.get('/:id', RoleController.getRole);
router.post('/', RoleController.createRole);
router.put('/:id', RoleController.updateRole);
router.delete('/:id', RoleController.deleteRole);

export default router;