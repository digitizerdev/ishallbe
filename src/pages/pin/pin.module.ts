import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinPage } from './pin';

@NgModule({
  declarations: [
    PinPage,
  ],
  imports: [
    IonicPageModule.forChild(PinPage),
  ],
})
export class PinPageModule {}
