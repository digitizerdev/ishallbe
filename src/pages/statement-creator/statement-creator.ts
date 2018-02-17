import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-statement-creator',
  templateUrl: 'statement-creator.html',
})
export class StatementCreatorPage {
 createStatementForm: {
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
    console.log('ionViewDidLoad StatementCreatorPage');
  }

}