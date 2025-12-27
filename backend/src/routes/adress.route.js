import { Router } from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/address.controller.js";

const addressRouter = Router();

addressRouter.post('/add',addAddress)
addressRouter.get('/get/:userId',getAddress)

export default addressRouter