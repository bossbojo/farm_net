import { SignUpComponent } from './sign-up.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:SignUpComponent },
];

export const SignUpRoutes = RouterModule.forChild(routes);
