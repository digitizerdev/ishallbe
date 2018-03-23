import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationsPage } from '../../pages/notifications/notifications';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  myAffirmations = false;
  postType = "statements";

  constructor(
    private navCtrl: NavController,
  ) {
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}