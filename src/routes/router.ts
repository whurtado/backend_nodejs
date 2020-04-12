import { Router, Request, Response } from 'express';
import { getClientes, getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/Cliente.controller';
import { getUsuarios, getUsuario, createUsuario, updateUsuario, deleteUsuario } from '../controllers/Usuario.controller';


const router = Router();


router.get ('/mensajes', (req:Request, res:Response) =>{

    res.json({
        ok:true,
        mensaje: 'Todo esta bien'
    })
}); 


router.post('/mensajes', (req:Request, res:Response ) =>{

   const cuerpo = req.body.cuerpo;
   const de     = req.body.de;

   res.json({
       ok:true,
       cuerpo,
       de
   })
})


router.post('/mensajes/:id', (req:Request, res:Response ) =>{

    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;
    const id     = req.params.id;

 
    res.json({
        ok:true,
        cuerpo,
        de,
        id
    })
 })


//RUTAS USUARIO
router.get('/user', getUsuarios);
router.get('/user/:id', getUsuario);
router.post('/user', createUsuario);
router.put('/user/:id', updateUsuario);
router.delete('/user/:id', deleteUsuario);


//RUTAS CLIENTE
router.get('/customer', getClientes);
router.get('/customer/:id', getCliente);
router.post('/customer', createCliente);
router.put('/customer/:id', updateCliente);
router.delete('/customer/:id', deleteCliente);



export default router;