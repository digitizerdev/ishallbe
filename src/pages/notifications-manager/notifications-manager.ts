import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications-manager',
  templateUrl: 'notifications-manager.html',
})
export class NotificationsManagerPage {

  upcomingNotifications: any;
  noUpcomingNotifications = true;
  constructor(
    public navCtrl: NavController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsManagerPage');
    console.log("No Upcoming Notifications: " + this.noUpcomingNotifications);
  }

}
