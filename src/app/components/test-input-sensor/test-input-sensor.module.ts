import { TestInputSensorRoutes } from './test-input-sensor.routing';
import { SharedModule } from './../shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestInputSensorComponent } from './test-input-sensor.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    TestInputSensorRoutes
  ],
  declarations: [TestInputSensorComponent]
})
export class TestInputSensorModule { }