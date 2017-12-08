import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

  title = 'Support'

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }
}
