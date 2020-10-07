import { Response } from 'express';
import ApiResponse from '../classes/ApiResponse';
import { HTTP_STATUS_CODE_OK } from '../global/statuscode';
import { ValidationError } from 'class-validator';


class Controller {

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }

}

export default Controller;