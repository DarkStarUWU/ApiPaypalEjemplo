import { Router } from "express";
import {createOrder, 
    capturandoOrder, 
    cancelandoOrder} from '../controllers/payments.controllers'


const router = Router();




router.get('/crear-order', createOrder);


router.get('/capturar-order', capturandoOrder);


router.get('/cancelar-order', cancelandoOrder);

export default router;