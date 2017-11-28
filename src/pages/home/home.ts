import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';
import { CollabsPage } from '../collabs/collabs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToRegisterPage() {
    this.navCtrl.setRoot(RegisterPage);
  }

  goToCollabsPage() {
    this.navCtrl.push(CollabsPage);
  }

}
