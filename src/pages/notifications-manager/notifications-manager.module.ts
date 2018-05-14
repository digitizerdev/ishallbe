import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsManagerPage } from './notifications-manager';

@NgModule({
  declarations: [
    NotificationsManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsManagerPage),
  ],
})
export class NotificationsManagerPageModule {}
