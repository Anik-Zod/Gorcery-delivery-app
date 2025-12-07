import { Router } from "express";
import { getAllUser, getUser, googleLogin, isAuth, login, logout, register } from "../controllers/user.controller.js";
import authUser from "../middlewares/authUser.js";
import { upload } from "../configs/multer.js";

const homeRouter = Router();

homeRouter.get('/get/:id',getUser)
homeRouter.get('/getAll',getAllUser)
homeRouter.post('/register',upload.single('image'),register)
homeRouter.post('/login',login)
homeRouter.post('/google-login',googleLogin)
homeRouter.get('/logout',logout)
homeRouter.get('/is-auth',authUser,isAuth)

export default homeRouter;
