import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ColorPickPage } from './color-pick';

@NgModule({
  declarations: [
    ColorPickPage,
  ],
  imports: [
    IonicPageModule.forChild(ColorPickPage),
  ],
  exports: [
    ColorPickPage
  ]
})
export class ColorPickPageModule {}
