import { AuthenticationGuard } from './guards/authentication.guard';
import { AllowAnonymousGuard } from './guards/allowAnonymous.guard';
import { UrlConfig } from "./configs/url.config";
import { RouterModule, Routes, CanActivate } from '@angular/router';
//pages
const Url = UrlConfig;

export const RoutesList: Routes = [
    {
        path: Url.Signin,
        loadChildren: 'app/components/sign-in/sign-in.module.ts#SignInModule',
        canActivate:[AllowAnonymousGuard]
    },
    {
        path: Url.Signup,
        loadChildren: 'app/components/sign-up/sign-up.module.ts#SignUpModule',
        canActivate:[AllowAnonymousGuard]
    },
    {
        path: Url.Home,
        loadChildren: 'app/components/home/home.module.ts#HomeModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: Url.Profile,
        loadChildren: 'app/components/profile/profile.module.ts#ProfileModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: Url.Dashboard,
        loadChildren: 'app/components/dashboard/dashboard.module.ts#DashboardModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: Url.HistorySensor,
        loadChildren: 'app/components/history-sensor/history-sensor.module.ts#HistorySensorModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: Url.ChangePassword,
        loadChildren: 'app/components/change-password/change-password.module.ts#ChangePasswordModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: Url.TestInput,
        loadChildren: 'app/components/test-input-sensor/test-input-sensor.module.ts#TestInputSensorModule',
    },
    {
        path: Url.Setting,
        loadChildren: 'app/components/setting/setting.module.ts#SettingModule',
        canActivate:[AuthenticationGuard]
    },
    {
        path: '**',
        redirectTo:Url.Home,
        pathMatch: 'full'
    }
];

export const RoutingModule = RouterModule.forRoot(RoutesList);