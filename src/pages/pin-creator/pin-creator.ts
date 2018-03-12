import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pin-creator',
  templateUrl: 'pin-creator.html',
})
export class PinCreatorPage {

  constructor(public navCtrl: NavController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PinCreatorPage');
  }

}
