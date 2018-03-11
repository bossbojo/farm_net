import { SharedModule } from './../shared.module';
import { HomeRoutes } from './home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    HomeRoutes
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }