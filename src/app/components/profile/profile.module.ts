import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ProfileRoutes } from './profile.routing';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBhYS0H9gC11NoiMe2V7DcZeYGs6EOSBvA'
    }),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    CommonModule,
    SharedModule,
    CommonModule,
    ProfileRoutes
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }