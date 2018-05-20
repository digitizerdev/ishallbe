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
    console.log("Current Time in unix is " + this.currentTime());
    this.checkForUpcomingNotifications();
  }

  checkForUpcomingNotifications() {
    console.log("Checking for upcoming notifications");
    let upcomingNotifications = this.firebase.afs.collection('notifications', ref => ref.
      where('pin', '==', true).
      where('timestamp', '>=', this.currentTime()));
    upcomingNotifications.valueChanges().subscribe((notifications) => {
      console.log("Got Notifications");
      console.log(notifications);
    });
  }

  currentTime() {
    console.log("Getting Current Time in Unix");
    return moment.unix(parseInt(moment().format()));
  }

  pushNotificationCreatorPage() {
    this.navCtrl.push(NotificationCreatorPage);
  }

}
