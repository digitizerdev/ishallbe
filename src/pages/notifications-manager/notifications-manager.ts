import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications-manager',
  templateUrl: 'notifications-manager.html',
})
export class NotificationsManagerPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsManagerPage');
  }

}
