import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPicPage } from './account-pic';

@NgModule({
  declarations: [
    AccountPicPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPicPage),
  ],
})
export class AccountPicPageModule {}
