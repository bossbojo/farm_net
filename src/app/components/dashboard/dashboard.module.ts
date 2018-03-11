import { SharedModule } from './../shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts/ng2-charts';
@NgModule({
  imports: [
    ChartsModule,
    SharedModule,
    CommonModule,
    DashboardRoutes,
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }