import { Router, Request, Response } from "express";
import auth from "./auth";
//import rutas from "./router";
import user from "./usuario";
import client from "./client";
import documentType from "./documentType";
import city from "./city";
import department from "./department";
import status from "./status";


const routes = Router();

//routes.use("/router", rutas);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/client", client);
routes.use("/document-type", documentType);
routes.use("/city", city);
routes.use("/department", department);
routes.use("/status", status);

export default routes; 