import { SharedModule } from './../shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { AgmCoreModule } from '@agm/core';
import { ModalGrapComponent } from './modal-grap/modal-grap.component';
@NgModule({
  imports: [
    ChartsModule,
    SharedModule,
    CommonModule,
    DashboardRoutes,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhYS0H9gC11NoiMe2V7DcZeYGs6EOSBvA'
    })
  ],
  declarations: [
    DashboardComponent,
    ModalGrapComponent
]
})
export class DashboardModule { }