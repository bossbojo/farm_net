import { TestInputSensorComponent } from './test-input-sensor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:TestInputSensorComponent },
];

export const TestInputSensorRoutes = RouterModule.forChild(routes);
