import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-manager',
  templateUrl: 'user-manager.html',
})
export class UserManagerPage {

  usersReported = false;

  constructor(
    private navCtrl: NavController
  ) {}

  ionViewDidLoad() {
  }

}
