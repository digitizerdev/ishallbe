import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EmailUpdatePage } from './email-update';

@NgModule({
  declarations: [
    EmailUpdatePage,
  ],
  imports: [
    IonicPageModule.forChild(EmailUpdatePage),
  ],
})
export class EmailUpdatePageModule {}
