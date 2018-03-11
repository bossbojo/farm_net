import { ProfileRoutes } from './profile.routing';
import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ProfileRoutes
  ],
  declarations: [ProfileComponent]
})
export class ProfileModule { }