import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PinCreatorPage } from './pin-creator';

@NgModule({
  declarations: [
    PinCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(PinCreatorPage),
  ],
})
export class PinCreatorPageModule {}
