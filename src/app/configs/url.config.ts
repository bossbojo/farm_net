let production = true;
export const UrlConfig = {
    Home: 'home',
    Signup: 'signup',
    Signin: 'signin',
    Profile: 'profile',
    Dashboard: 'dahboard',
    HistorySensor: 'history-sensor',
    ChangePassword: 'change-password'
};
export const baseUrl = production? 'http://farm.paramat.work/api':'http://localhost:50262/api';
export const baseUrlimg = production? 'http://farm.paramat.work/Images':'http://localhost:50262/';
export const baseUrlsignalr = production? 'http://farm.paramat.work/':'http://localhost:50262/';