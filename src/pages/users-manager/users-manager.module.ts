import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsersManagerPage } from './users-manager';

@NgModule({
  declarations: [
    UsersManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(UsersManagerPage),
  ],
})
export class UsersManagerPageModule {}
