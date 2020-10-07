import { Router, Request, Response } from "express";
import auth from "./auth";
//import rutas from "./router";
import user from "./user";
import client from "./client";
import documentType from "./documentType";
import city from "./city";
import department from "./department";
import status from "./status";
import smtpServer  from "./smtpServer";
import email from "./email";



const routes = Router();

//routes.use("/router", rutas);
routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/client", client);
routes.use("/document-type", documentType);
routes.use("/city", city);
routes.use("/department", department);
routes.use("/status", status);
routes.use("/smtp-server", smtpServer);
routes.use("/send-email", email);

export default routes; 
