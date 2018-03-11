import { SharedModule } from './../shared.module';
import { ChangePasswordRoutes } from './change-password.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';

@NgModule({
  imports: [
    CommonModule,
    ChangePasswordRoutes,
    SharedModule
  ],
  declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule { }