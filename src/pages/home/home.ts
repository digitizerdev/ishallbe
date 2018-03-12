import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import moment from 'moment';

import { NotificationsPage } from '../../pages/notifications/notifications';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  rawDate: number;
  displayDate: string;
  rawTime: number;
  displayTime: string;

  constructor(
    private navCtrl: NavController,
  ) {
    this.timestamp();
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    this.displayDate = moment().format('MMM D YYYY');
    this.displayDate = this.displayDate.toUpperCase();
    let rawTimeString = moment().format('YYYYMMDDhhmmss');
    this.rawTime = parseInt(rawTimeString);
    this.displayTime = moment().format('h:mma');
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}