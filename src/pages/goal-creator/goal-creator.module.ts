import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalCreatorPage } from './goal-creator';

@NgModule({
  declarations: [
    GoalCreatorPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalCreatorPage),
  ],
})
export class GoalCreatorPageModule {}
