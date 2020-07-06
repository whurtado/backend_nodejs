
class DataNotFoundError implements Error {

    message: string;
    name: string;
    statusCode: number;

}

export default DataNotFoundError;