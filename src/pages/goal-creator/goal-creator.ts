import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCreatorage');
  }

}