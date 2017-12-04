import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinManagerPage } from './pin-manager';

@NgModule({
  declarations: [
    PinManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(PinManagerPage),
  ],
})
export class PinManagerPageModule {}
