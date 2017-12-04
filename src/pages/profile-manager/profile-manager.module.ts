import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileManagerPage } from './profile-manager';

@NgModule({
  declarations: [
    ProfileManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileManagerPage),
  ],
})
export class ProfileManagerPageModule {}
