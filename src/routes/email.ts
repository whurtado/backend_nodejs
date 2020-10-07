import { Router } from 'express';
import MailController from '../controllers/MailController';
const router = Router();

//Rutas Email
router.post('/', MailController.sendMail);

export default router;
