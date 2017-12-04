import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserManagerPage } from './user-manager';

@NgModule({
  declarations: [
    UserManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(UserManagerPage),
  ],
})
export class UserManagerPageModule {}
