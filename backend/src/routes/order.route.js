import {Router} from 'express';
import authUser from '../middlewares/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderOnline } from '../controllers/order.controller.js';

const orderRouter = Router();

orderRouter.post('/cod',authUser,placeOrderCOD);
orderRouter.post('/online',authUser,placeOrderOnline)
orderRouter.get('/myOrder/:userId',getUserOrders)
orderRouter.get('/seller',authUser,getAllOrders)

export default orderRouter;
