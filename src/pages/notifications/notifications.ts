import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import moment from 'moment';

import { mockNotifications } from '../../../test-data/notifications/mocks';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  rawDate: number;
  readNotifications: any[];
  unreadNotifications: any[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.readNotifications = [];
    this.unreadNotifications = [];
    this.timeStampPage();
    this.loadNotifications();
  }

  timeStampPage() {
    let rawDateString = moment().format('YYYYMMDDhhmmss');
    this.rawDate = parseInt(rawDateString);
  }

  loadNotifications() {
    mockNotifications.forEach((notification) => {
      if (notification.timestamp < this.rawDate) 
        notification.displayTimestamp = moment(notification.timestamp, "YYYYMMDD").fromNow();
        else notification.displayTimestamp = moment(notification.timestamp, "YYYYMMDDhhmmss").fromNow();
      if (notification.read) this.readNotifications.push(notification);
      else this.unreadNotifications.push(notification);
    });
  }

}
