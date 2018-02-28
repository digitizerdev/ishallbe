import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-manager',
  templateUrl: 'user-manager.html',
})
export class UserManagerPage {

  constructor(public navCtrl: NavController ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserManagerPage');
  }

}
