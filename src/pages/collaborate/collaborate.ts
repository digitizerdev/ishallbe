import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-collaborate',
  templateUrl: 'collaborate.html',
})
export class CollaboratePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollaboratePage');
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterPage);
  }

}
