let production = true;
export const UrlConfig = {
    Home: 'home',
    Signup: 'signup',
    Signin: 'signin',
    Profile: 'profile',
    Dashboard: 'dahboard',
    HistorySensor: 'history-sensor',
    ChangePassword: 'change-password',
    TestInput: 'test-input',
    Setting: 'setting'
};
export const baseUrl = production? 'http://farm.paramat.work/api':'http://localhost:64630/api';
export const baseUrlimg = 'http://farm.paramat.work/Images/';
export const baseUrlsignalr = production? 'http://farm.paramat.work/':'http://localhost:64630/';