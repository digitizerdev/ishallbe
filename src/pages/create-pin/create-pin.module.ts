import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreatePinPage } from './create-pin';

@NgModule({
  declarations: [
    CreatePinPage,
  ],
  imports: [
    IonicPageModule.forChild(CreatePinPage),
  ],
})
export class CreatePinPageModule {}
