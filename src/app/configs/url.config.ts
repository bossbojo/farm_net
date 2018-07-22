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
    Setting: 'setting',
    CreateSensor:'create-sensor'
};

export const baseUrl = production? 'http://webapi.cricket-farm.work/api':'http://localhost:64630/api';
export const baseUrlimg = production?'http://webapi.cricket-farm.work/Images/' :'http://localhost:64630/Images';
export const baseUrlsignalr = production? 'http://webapi.cricket-farm.work':'http://localhost:64630/';