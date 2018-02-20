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
    console.log("Raw date is " + this.rawDate);
    this.displayDate = moment().format('MMM D YYYY');
    this.displayDate = this.displayDate.toUpperCase();
    console.log("Display date is " + this.displayDate);
    let rawTimeString = moment().format('YYYYMMDDhhmmss');
    this.rawTime = parseInt(rawTimeString);
    console.log("Raw Time is " + this.rawTime);
    this.displayTime = moment().format('h:mma');
    console.log("Display time is " + this.displayTime);
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}