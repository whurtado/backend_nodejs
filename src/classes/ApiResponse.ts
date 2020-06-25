import { ValidationError } from "class-validator";
import { Response } from 'express';
import { ApiResponseInterface } from '../interfaces/ApiResponse';
import { HTTP_STATUS_CODE_OK } from '../global/statuscode';
import { Status } from '../entities/Status';


export default class ApiResponse implements ApiResponseInterface {
    ok: boolean;
    message: string;
    data: any;
    status: number;
    validationsErros?: ValidationError[];
    response: Response;

    constructor (response : Response, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", data: any = null, validationError? : ValidationError[]){
        this.ok = ok;
        this.message = message;
        this.data = data;
        this.status = code;
        this.validationsErros = validationError;
        this.response = response;
        this.sendResponse();
    }

    sendResponse() {
        const result  = {
            ok : this.ok,
            message : this.message,
            data: this.data,
            status: this.status,
            validationsErros: this.validationsErros
        }
        this.response.setHeader('Content-Type', 'text/plain');
        this.response.status(this.status).json(result);
    }
    
}