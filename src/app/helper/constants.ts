export default class Constants {
    public static readonly authorizationKey = 'Authorization';
    public static readonly bearer = 'Bearer';
    public static readonly contentType = 'Content-Type';
    public static readonly contentTypeValue = 'application/json';
    public static readonly badRequestExceptionMessage = 'Bad request, kindly verify request and process again!';
    public static readonly unauthorizedExceptionMessage = 'Unauthorized, invalid username and password!';
    public static readonly forbiddenExceptionMessage = 'Forbidden, you dont have permission!';
    public static readonly notFoundExceptionMessage = 'Not Found, resource you are looking for, is not exist!';
    public static readonly preconditionFailedExceptionMessage = 'Precondition failed, request header information is missing!';
    public static readonly internalServerExceptionMessage = 'Internal server error';
    public static readonly defaultExceptionMessage = 'Something went wrong, please try again after some time!';
    public static readonly accessTokenKey = 'access_token';
    public static readonly userKey = 'user';
    public static readonly userId = 'userId';
    public static readonly userPassword = 'userPassword';
    
    public static readonly returnUrl = 'returnUrl';
    public static readonly passwordRegxPattern='((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]))';
    
    public static readonly accessToken_lsKey = 'accessToken';
    public static readonly loggedInUser_lsKey = 'user';
    public static readonly lastTokenNumber_lsKey = 'lastTokenNumber'
    public static readonly activeTokenNumber_lsKey = 'activeTokenNumber'

    public static readonly login_routePath = '/login'
    public static readonly dashboard_routePath = '/dashboard'

}
