import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared.module';
import { CreateSensorRoutes } from './create-sensor.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSensorComponent } from './create-sensor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CreateSensorRoutes,
    CommonModule
  ],
  declarations: [CreateSensorComponent]
})
export class CreateSensorModule { }
