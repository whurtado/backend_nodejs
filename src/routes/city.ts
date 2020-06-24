import { Router } from 'express';
import CityController from '../controllers/CityController'
const router = Router();

//RUTAS CLIENTE
router.get('/', CityController.getAllCities);
router.get('/department/:id', CityController.getAllCitiesByDepartment);


// router.get('/:id', CityController.getOneCity);
// router.post('/', CityController.createCity);
// router.put('/:id', ClientController.updateCity);
// router.delete('/:id', ClientController.deleteCity);


export default router;