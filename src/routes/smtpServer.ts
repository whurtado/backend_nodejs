import { Router } from 'express';
import SmtpServerController from '../controllers/SmtpServerController'
const router = Router();

//RUTAS CLIENTE
router.get('/', SmtpServerController.getAllSmtpServers);
router.get('/:id', SmtpServerController.getSmtpServer);
router.post('/pagination-filters/', SmtpServerController.getAllSmtpServersPaginated),
router.post('/', SmtpServerController.createSmtpServer);
router.put('/:id', SmtpServerController.updateSmtpServer);
// router.delete('/:id', SmtpServerController.deleteSmtpServer);


export default router;