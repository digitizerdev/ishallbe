import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Notification } from '../../../test-data/notifications/model';

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
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsManagerPage');
    console.log("No Upcoming Notifications: " + this.noUpcomingNotifications);
  }

  createNotification() {
    console.log("Creating Notification");
    let id = this.firebase.afs.createId();
    let displayTimestamp = moment().format('MMM DD YYYY');
    let timestamp = moment().unix();
    let notification: Notification ={
      id: id,
      uid: this.firebase.user.uid,
      name: this.firebase.user.name,
      face: this.firebase.user.photo,
      description: 'Happy Saturday! Please comment your favorite affirmation from the week!',
      read: false,
      collection: 'pins',
      docId: '1',
      receiverUid: 'all',
      pin: true,
      message: false,
      pinLike: false,
      statementLike: false,
      goalLike: false,
      commentLike: false,
      comment: false,
      reminder: false,
      displayTimestamp: displayTimestamp,
      timestamp: timestamp
    }
    this.firebase.afs.doc('notifications/1/').set(notification);
  }

}
