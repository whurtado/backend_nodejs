import { Entity, getRepository, FindManyOptions } from 'typeorm';
import { Request } from 'express';

export default class PaniteData {
    

    static async paginator(req: Request, entity: any, optinos?: FindManyOptions<any>){
        
        const repository   = getRepository(entity);
        const page         = parseInt((req.params.page <= 0)? 1 : req.params.page)
        const limit        = parseInt(req.params.limit)
        const skip         = ((page - 1) * limit);
        const totalRecords = await repository.count();
        const totalPages   = Math.ceil(totalRecords / limit);
      
        let finalOptions : FindManyOptions<any>;

        if(optinos !== undefined){
            finalOptions = optinos;
            finalOptions.skip = skip;
            finalOptions.take = limit;
        }else{
            finalOptions = {
                skip: skip,
                take: limit
            }
        }

        const data = await repository.find(finalOptions);
        const result = {
            totalRecords,
            totalPages,
            page,
            skip,
            take: limit,
            data
        }
        return result;
    }

}