import { SharedModule } from './../shared.module';
import { HistorySensorRoutes } from './history-sensor.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorySensorComponent } from './history-sensor.component';

@NgModule({
  imports: [
    SharedModule,
    HistorySensorRoutes,
    CommonModule
  ],
  declarations: [HistorySensorComponent]
})
export class HistorySensorModule { }