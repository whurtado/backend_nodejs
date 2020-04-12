import { Router, Request, Response } from "express";
import auth from "./auth";
//import rutas from "./router";
import cliente from "./cliente";
import usuario from "./usuario";

const routes = Router();

//routes.use("/router", rutas);
routes.use("/auth", auth);
routes.use("/customer", cliente);
routes.use("/user", usuario);

export default routes; 