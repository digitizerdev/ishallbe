import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationCreatorPage } from '../notification-creator/notification-creator';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notification-manager',
  templateUrl: 'notification-manager.html',
})
export class NotificationManagerPage {

  upcomingNotifications: any;
  noUpcomingNotifications = true;
  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsManagerPage');
    console.log("No Upcoming Notifications: " + this.noUpcomingNotifications);
  }

  pushNotificationCreatorPage() {
    this.navCtrl.push(NotificationCreatorPage);
  }

}
