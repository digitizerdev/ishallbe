import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContractsPage } from './contracts';

@NgModule({
  declarations: [
    ContractsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContractsPage),
  ],
})
export class ContractsPageModule {}
