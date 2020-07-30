import { Router } from 'express';
import DepartmentController from '../controllers/DepartmentController'
const router = Router();

//RUTAS CLIENTE
router.get('/', DepartmentController.getAllDepartments);
router.get('/country/:id', DepartmentController.getAllDepartmentsByCountry);


// router.get('/:id', DepartmentController.getOneDepartment);
// router.post('/', DepartmentController.createDepartment);
// router.put('/:id', DepartmentController.updateDepartment);
// router.delete('/:id', DepartmentController.deleteDepartment);


export default router;