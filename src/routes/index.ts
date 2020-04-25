import { Router, Request, Response } from "express";
import auth from "./auth";
//import rutas from "./router";
import cliente from "./cliente";
import user from "./user";
import role from "./role";

const routes = Router();

//routes.use("/router", rutas);
routes.use("/auth", auth);
routes.use("/cliente", cliente);
routes.use("/user", user);
routes.use("/role", role);

export default routes; 
