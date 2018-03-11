import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from './../shared.module';
import { SignUpRoutes } from './sign-up.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    SignUpRoutes
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }