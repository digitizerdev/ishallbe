import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePhotoPage } from './profile-photo';

@NgModule({
  declarations: [
    ProfilePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePhotoPage),
  ],
})
export class ProfilePhotoPageModule {}
