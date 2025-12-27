import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add',authUser,addAddress)
addressRouter.get('/get/:userId',authUser,getAddress)

export default addressRouter