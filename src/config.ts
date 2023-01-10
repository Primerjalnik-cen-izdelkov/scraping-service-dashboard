const envSettings = window as any;
export class Config {
    static BOTS_URL:string = envSettings.BOTS_URL;
    static LOGIN_URL:string = envSettings.LOGIN_URL;
}