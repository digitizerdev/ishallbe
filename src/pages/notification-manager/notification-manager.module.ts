import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationManagerPage } from './notification-manager';

@NgModule({
  declarations: [
    NotificationManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationManagerPage),
  ],
})
export class NotificationManagerPageModule {}
