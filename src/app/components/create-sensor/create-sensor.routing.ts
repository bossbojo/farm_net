import { CreateSensorComponent } from './create-sensor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:CreateSensorComponent },
];

export const CreateSensorRoutes = RouterModule.forChild(routes);
