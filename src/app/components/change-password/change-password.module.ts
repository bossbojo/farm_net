import { AgmCoreModule } from '@agm/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared.module';
import { ChangePasswordRoutes } from './change-password.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhYS0H9gC11NoiMe2V7DcZeYGs6EOSBvA'
    }),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    ChangePasswordRoutes,
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }