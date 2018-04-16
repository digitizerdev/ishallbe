import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordUpdatePage } from './password-update';

@NgModule({
  declarations: [
    PasswordUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordUpdatePage),
  ],
})
export class PasswordUpdatePageModule {}
