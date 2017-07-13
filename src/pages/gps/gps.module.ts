import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GpsPage } from './gps';

@NgModule({
  declarations: [
    GpsPage,
  ],
  imports: [
    IonicPageModule.forChild(GpsPage),
  ],
  exports: [
    GpsPage
  ]
})
export class GpsPageModule {}
