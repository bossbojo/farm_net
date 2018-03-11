import { SignInComponent } from './sign-in.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:SignInComponent },
];

export const SignInRoutes = RouterModule.forChild(routes);
