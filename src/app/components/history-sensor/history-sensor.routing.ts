import { HistorySensorComponent } from './history-sensor.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path:'',component:HistorySensorComponent },
];

export const HistorySensorRoutes = RouterModule.forChild(routes);
