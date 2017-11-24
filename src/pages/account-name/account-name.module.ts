import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountNamePage } from './account-name';

@NgModule({
  declarations: [
    AccountNamePage,
  ],
  imports: [
    IonicPageModule.forChild(AccountNamePage),
  ],
})
export class AccountNamePageModule {}
