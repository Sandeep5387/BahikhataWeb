export interface Alert{
    message:string,
    type:MessageType
}

export enum MessageType {
    NoMessage,
    info,
    success,
    warning,
    error,
  }
