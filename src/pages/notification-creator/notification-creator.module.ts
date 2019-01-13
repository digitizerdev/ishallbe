import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationCreatorPage } from './notification-creator';

@NgModule({
  declarations: [
    NotificationCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationCreatorPage),
  ],
})
export class NotificationCreatorPageModule {}
