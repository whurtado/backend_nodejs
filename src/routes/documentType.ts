import { Router } from 'express';
import  DocumentTypeController  from '../controllers/DocumentTypeController';
const router = Router();

//RUTAS TIPO DOCUMENTO
router.get('/', DocumentTypeController.getAllDocumentType);
router.get('/module/:id', DocumentTypeController.getAllDocumentTypeByModule);


// router.get('/:id', DocumentTypeController.getOneDocumentType);
// router.post('/', DocumentTypeController.createDocumentType);
// router.put('/:id', DocumentTypeController.updateDocumentType);
// router.delete('/:id', DocumentTypeController.deleteDocumentType);


export default router;