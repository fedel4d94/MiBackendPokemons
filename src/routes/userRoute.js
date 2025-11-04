import express from "express";
import { createUser, deleteUser, getUsers, updateUser, validate } from "../controllers/userController.js";
import { verifyTokenMiddlaware } from "../middlewares/verifyTokenMiddleware.js";

//Creamos el enrutador.
//Controla el conjunto de las rutas y se orienta a una entidad

export const userRouter = express.Router();

//Los endpoints -> http://localhost:3000/api/user/create

//Endpoints
//          Verbo  PATH    Controlador
userRouter.post("/create", createUser);
//userRouter.get("/", getUsers);
//Aca tenemos el middleware que verifica si el token es apto para hacer la consulta.
userRouter.get("/", verifyTokenMiddlaware, getUsers);
userRouter.delete("/delete/:id", verifyTokenMiddlaware, deleteUser);
userRouter.put("/update/:id", verifyTokenMiddlaware, updateUser);
userRouter.post("/login", validate);
