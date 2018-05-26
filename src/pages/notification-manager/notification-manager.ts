import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

import { NotificationCreatorPage } from '../notification-creator/notification-creator';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notification-manager',
  templateUrl: 'notification-manager.html',
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class NotificationManagerPage {

  scheduledNotifications: any[] = [];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    console.log("Current Time in unix is " + moment().unix());
    this.checkForScheduledNotifications()
  }

  checkForScheduledNotifications() {
    console.log("Checking for scheduled notifications");
    let currentTime = moment().unix();
    console.log("Current Time in unix is " + currentTime);
    let scheduledNotifications = this.firebase.afs.collection('notifications', ref => ref.
      where('timestamp', '>=', currentTime).
      where('receiverUid', '==', 'all').
      limit(50));
    scheduledNotifications.valueChanges().subscribe((notifications) => {
      console.log("Got Notifications");
      console.log(notifications);
      this.scheduledNotifications = notifications;
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
