import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUpdatePage } from './profile-update';

@NgModule({
  declarations: [
    ProfileUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUpdatePage),
  ],
})
export class ProfileUpdatePageModule {}
