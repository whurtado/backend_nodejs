import { ValidationError } from "class-validator";

export interface ApiResponseInterface {
    ok: boolean;
    message: string;
    data: any;
    status: number;
    validationsErros?: ValidationError[];
}