
    export interface Payload {
        username: string;
        password: string;
    }

    export interface Request<T> {
        payload: T;
    }

    export interface ErrorModel {
        code: string;
        message:string;
    }

    export interface Response<T>{
        error:ErrorModel[],
        payload:T,
        metadata:MetadataModel
    }

    export interface MetadataModel {
        status: string;
        module:string;
    }