import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateStatementPage } from './create-statement';

@NgModule({
  declarations: [
    CreateStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateStatementPage),
  ],
})
export class CreateStatementPageModule {}
