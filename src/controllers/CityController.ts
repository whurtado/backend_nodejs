import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { City } from '../entities/City';
import ApiResponse from '../classes/ApiResponse';
import { ValidationError } from 'class-validator';

class CityController {

    static options : FindManyOptions<City> = {
        relations: ["department"],
        order: {
            name: "ASC" 
        }
    }

    static getAllCities = async (req : Request, res : Response) => {
        const cityRepository = getRepository(City);
        const cities = await cityRepository.find(CityController.options);
        //returs a city object
        CityController.sendResponse(res, cities);
    }

    static getAllCitiesByDepartment = async (req : Request, res : Response) => {
        const id = req.params.id;
        const cityRepository = getRepository(City);
        const cities = await cityRepository.find({
            where: {
                department: id
            },
            order: {
                name: "ASC" 
            }
        });
        //returs a status object
        CityController.sendResponse(res, cities);
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }
}

export default CityController;