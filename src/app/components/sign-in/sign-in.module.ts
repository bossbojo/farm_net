import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInRoutes } from './sign-in.routing';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    SignInRoutes
  ],
  declarations: [SignInComponent]
})
export class SignInModule { }