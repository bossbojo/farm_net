import { AgmCoreModule } from '@agm/core';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { SharedModule } from './../shared.module';
import { SignUpRoutes } from './sign-up.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhYS0H9gC11NoiMe2V7DcZeYGs6EOSBvA'
    }),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    SignUpRoutes
  ],
  declarations: [SignUpComponent]
})
export class SignUpModule { }