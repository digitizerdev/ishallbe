import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StatementPage } from './statement';

@NgModule({
  declarations: [
    StatementPage,
  ],
  imports: [
    IonicPageModule.forChild(StatementPage),
  ],
})
export class StatementPageModule {}
