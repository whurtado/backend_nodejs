import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { ValidationError } from 'class-validator';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { Status } from '../entities/Status';
import ApiResponse from '../classes/ApiResponse';
import ModuleController from './ModuleController';

class StatusController {

    /**
     * General options
     */
    static options : FindManyOptions<Status> = {
        relations: ["module"],
        order: {
            module: "ASC",
            name: "ASC" 
        }
    }

    static getAllStatus = async (req : Request, res : Response) => {
        const statusRepository = getRepository(Status);
        const status = await statusRepository.find(StatusController.options);
        //returs a status object
        StatusController.sendResponse(res, status);
    }

    static getAllStatusOfClientModule = async (req : Request, res : Response) => {
        const status = await StatusController.getAllStatusByModuleId(ModuleController.CLIENT_MUDULE_ID)
        StatusController.sendResponse(res, status);
    }

    static getAllStatusByModule = async (req : Request, res : Response) => {
        const status = await StatusController.getAllStatusByModuleId(req.params.id);
        StatusController.sendResponse(res, status);
    }

    static getAllStatusByModuleId = async(id: number) : Promise<Status[]> => {
        const statusRepository = getRepository(Status);
        const status = await statusRepository.find({
            where: {
                module: id
            },
            order: {
                name: "ASC" 
            }
        });
        return status;
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }

}

export default StatusController;