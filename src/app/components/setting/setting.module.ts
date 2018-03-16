import { SettingRoutes } from './setting.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './setting.component';
import { SharedModule } from '../shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    SettingRoutes
  ],
  declarations: [SettingComponent]
})
export class SettingModule { }