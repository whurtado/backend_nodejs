import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { Department } from '../entities/Department';
import ApiResponse from '../classes/ApiResponse';
import { ValidationError } from 'class-validator';

class DepartmentController {

    static options : FindManyOptions<Department> = {
        relations: ["country"],
        order: {
            name: "ASC" 
        }
    }

    static getAllDepartments = async (req : Request, res : Response) => {
        const departmentRepository = getRepository(Department);
        const departments = await departmentRepository.find(DepartmentController.options);
        //returs a department object
        DepartmentController.sendResponse(res, departments);
    }

    static getAllDepartmentsByCountry = async (req : Request, res : Response) => {
        const id = req.params.id;
        const departmentRepository = getRepository(Department);
        const departments = await departmentRepository.find({
            where: {
                country: id
            },
            order: {
                name: "ASC" 
            }
        });
        //returs a status object
        DepartmentController.sendResponse(res, departments);
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }

}

export default DepartmentController;