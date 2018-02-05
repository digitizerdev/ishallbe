import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatementCreatorPage } from './statement-creator';

@NgModule({
  declarations: [
    StatementCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(StatementCreatorPage),
  ],
})
export class StatementCreatorPageModule {}
