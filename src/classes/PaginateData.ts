import { Entity, getRepository, FindManyOptions } from 'typeorm';
import { Request } from 'express';

export default class PaginateData {
    

    static async paginator(req: Request, entity: any, optinos?: FindManyOptions<any>){
        
        
        const repository   = getRepository(entity);
        const page         = parseInt((req.body.page <= 0)? 1 : req.body.page)
        const limit        = parseInt(req.body.limit)
        const skip         = ((page - 1) * limit);

        let finalOptions : FindManyOptions<any>;

        if(optinos !== undefined){
            finalOptions = optinos;
            finalOptions.skip = skip;
            finalOptions.take = limit;
            finalOptions.cache = true;
        }else{
            finalOptions = {
                skip: skip,
                take: limit
            }
        }
        
        const totalRecords = await repository.count(finalOptions);
        const totalPages   = Math.ceil(totalRecords / limit);
      
        console.log('finalOptions: ', finalOptions);

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