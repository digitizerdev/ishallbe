import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { mockNotifications } from '../../../test-data/notification/mocks';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

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
    this.loadNotifications();
  }

  loadNotifications() {
    console.log("Loading notifications");
    mockNotifications.forEach((notification) => {
      console.log(notification);
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
