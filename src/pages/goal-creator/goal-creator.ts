import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-goal-creator',
  templateUrl: 'goal-creator.html',
})
export class GoalCreatorPage {
  createGoalForm: {
    title?: string;
    description?: string, 
  } = {};    
  submitted = false;
  private = false;

  constructor(
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCreatorage');
  }

}