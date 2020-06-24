import { Request, Response} from 'express';
import { getRepository, FindManyOptions } from 'typeorm';
import { HTTP_STATUS_CODE_OK, HTTP_STATUS_CODE_NO_CONTENT, HTTP_STATUS_CODE_NOT_FOUND, HTTP_STATUS_CODE_BAD_REQUEST, HTTP_STATUS_CODE_CREATED, HTTP_STATUS_CODE_NOT_CONFLICT } from '../global/statuscode';
import { DocumentType } from '../entities/DocumentType';
import ApiResponse from '../classes/ApiResponse';
import { ValidationError } from 'class-validator';

class DocumentTypeController {

    static options : FindManyOptions<DocumentType> = {
        relations: ["status", "module"],
        order: {
            name: "ASC" 
        }
    };


    static getAllDocumentType = async (req: Request, res: Response) => {
        const documentTypeRepository = getRepository(DocumentType);
        const documentType = await documentTypeRepository.find(DocumentTypeController.options);
        //Returns a DocumentType object
        DocumentTypeController.sendResponse(res, documentType);
    }

    static getAllDocumentTypeByModule = async (req : Request, res : Response) => {
        const id = req.params.id;
        const documentTypeRepository = getRepository(DocumentType);
        const documentType = await documentTypeRepository.find({
            where: {
                country: id
            }
        });
        //returs a status object
        DocumentTypeController.sendResponse(res, documentType);
    }

    static sendResponse(response : Response, data: any = null, code : number = HTTP_STATUS_CODE_OK, ok : boolean = true, message : string = "OK", validationError? : ValidationError[]) {
        const apiResponse = new ApiResponse(response, code, ok, message, data, validationError);
        apiResponse.sendResponse();
    }


}

export default DocumentTypeController;