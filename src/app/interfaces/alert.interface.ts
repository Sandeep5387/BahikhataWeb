export interface Alert{
    message:string,
    type:MessageType
}

export enum MessageType {
    enomessage,
    info,
    success,
    warning,
    error,
  }
