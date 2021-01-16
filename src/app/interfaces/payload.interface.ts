
    export interface Payload {
        username: string;
        password: string;
    }

    export interface RootObject {
        payload: any;
    }

    export interface ErrorModel {
        code: string;
        message:string;
    }

    export interface ResponseModel{
        error:ErrorModel[],
        payload:any,
        metadata:MetadataModel
    }

    export interface MetadataModel {
        status: string;
        module:string;
    }