import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-create-goal',
  templateUrl: 'create-goal.html',
})
export class CreateGoalPage {

  createGoalForm: {
    subject?: string;
    body?: string, 
  } = {};    
  submitted = false;

  constructor(
    private navCtrl: NavController, 
    private navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGoalPage');
  }

}
