import SmtpServerController from "./SmtpServerController";
import { getRepository } from 'typeorm';
import { SmtpServer } from '../entities/SmtpServer';
import { Request, Response } from 'express';
import { HTTP_STATUS_CODE_BAD_REQUEST } from '../global/statuscode';
import Controller from './Controller';

class MailController {

    
    static sendMail = async (req: Request, res: Response) => {

        const nodemailer = require("nodemailer");

        try {
            const dataSmtp : any = await getRepository(SmtpServer).find({relations: ["status"]});
            let responseEmail = {
                send: true,
                message: ""
            };
            
            if(dataSmtp.length === 0) {
                Controller.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, "No existe configuración SMTP");
            }else{

                const smtp = dataSmtp[0];
    
                let {
                    from, 
                    to, 
                    subject, 
                    text,
                    html
                } = req.body;
                
                // create reusable transporter object using the default SMTP transport
                let transporter = nodemailer.createTransport({
                    host: smtp.host ,
                    port: smtp.port,
                    secure: ((smtp.port === 465) ? true : false), // true for 465, false for other ports
                    auth: {
                        user: smtp.user, // generated ethereal user
                        pass: smtp.password, // generated ethereal password
                    },
                });

                // verify connection configuration
                transporter.verify(function(error, success) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Server is ready to take our messages");
                    }
                });

                // send mail with defined transport object
                let info = await transporter.sendMail({
                    from, // sender address
                    to, // list of receivers
                    subject, // Subject line
                    text, // plain text body
                    html // html body
                });

                responseEmail.message = info.messageId;

                Controller.sendResponse(res, responseEmail);
            }

        } catch (error) {
            Controller.sendResponse(res, null, HTTP_STATUS_CODE_BAD_REQUEST, false, error.message);
        }
     
    }

}

export default MailController;