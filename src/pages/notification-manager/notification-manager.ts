import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { NotificationCreatorPage } from '../notification-creator/notification-creator';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notification-manager',
  templateUrl: 'notification-manager.html',
})
export class NotificationManagerPage {

  upcomingNotifications: any;
  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log("Current Time in unix is " + moment().unix());
    this.checkForUpcomingNotifications()
  }

  checkForUpcomingNotifications() {
    console.log("Checking for upcoming notifications");
    let upcomingNotifications = this.firebase.afs.collection('notifications', ref => ref.
      where('pin', '==', true).
      where('timestamp', '>=', moment().unix()));
    upcomingNotifications.valueChanges().subscribe((notifications) => {
      console.log("Got Notifications");
      console.log(notifications);
      if (notifications.length == 0 ) this.upcomingNotifications = false;
      else this.upcomingNotifications = notifications;
    });
  }

  delete(notification) {
    console.log("Deleting Notification");
    console.log(notification);
    this.firebase.afs.doc('notifications/' + notification.id).delete();
  }

  viewUser(uid) {
    console.log("Viewing User");
    console.log(uid);
    if (this.firebase.user.uid !== uid)
     this.navCtrl.setRoot(ProfilePage, { uid: uid });
  }

  pushNotificationCreatorPage() {
    this.navCtrl.push(NotificationCreatorPage);
  }

}
