export class Constant{
    public static APP_URL = "http://www.trinityapplab.co.in/UniversalApp/";
    public static SUCCESS_CODE   = "100000";
    public static TRINITY_PRIVATE_KEY = "TRINITYPRIVATEKEY";
    public static COMPANY = "Universal App"

    public static returnServerErrorMessage(serviceName:string):string{
        return "Server error while invoking "+serviceName+ " service";
    }
}