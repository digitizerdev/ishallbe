import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApiManagerPage } from './api-manager';

@NgModule({
  declarations: [
    ApiManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(ApiManagerPage),
  ],
})
export class ApiManagerPageModule {}
