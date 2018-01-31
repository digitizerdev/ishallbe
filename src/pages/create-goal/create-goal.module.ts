import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateGoalPage } from './create-goal';

@NgModule({
  declarations: [
    CreateGoalPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateGoalPage),
  ],
})
export class CreateGoalPageModule {}
