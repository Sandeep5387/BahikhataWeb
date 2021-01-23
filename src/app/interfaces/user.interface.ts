export interface IUserDetails {
    username:string,
    password:string,
    id:string,
    createdAt: string,
    lastModified: string,
    lastLoginTime: string,
    loginDeviceType: string
}


export interface IUser {
    userDetails:IUserDetails,
    token:string
}