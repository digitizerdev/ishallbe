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
    console.log('ionViewDidLoad NotificationsPage');
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
    console.log("Loading notifications");
    mockNotifications.forEach((notification) => {
      console.log(notification);
      if (notification.timestamp < this.rawDate) 
        notification.displayTimestamp = moment(notification.timestamp, "YYYYMMDD").fromNow();
        else notification.displayTimestamp = moment(notification.timestamp, "YYYYMMDDhhmmss").fromNow();
      if (notification.read) this.readNotifications.push(notification);
      else this.unreadNotifications.push(notification);
    });
    console.log("Finished loading notifications");
    console.log("Read Notifications");
    console.log(this.readNotifications);
    console.log("Unread notifications");
    console.log(this.unreadNotifications);
  }

}
