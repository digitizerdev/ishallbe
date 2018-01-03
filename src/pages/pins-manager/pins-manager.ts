import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CreatePinPage } from '../create-pin/create-pin';

@IonicPage()
@Component({
  selector: 'page-pins-manager',
  templateUrl: 'pins-manager.html',
})
export class PinsManagerPage {
  
  title = 'Manage Pins';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PinsManagerPage');
  }

  pushCreatePinPage() {
    this.navCtrl.push(CreatePinPage);
  }

}
