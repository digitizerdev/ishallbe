import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinsManagerPage } from './pins-manager';

@NgModule({
  declarations: [
    PinsManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PinsManagerPage),
  ],
})
export class PinsManagerPageModule {}
