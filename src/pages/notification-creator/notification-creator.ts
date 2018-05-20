import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Notification } from '../../../test-data/notifications/model';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notification-creator',
  templateUrl: 'notification-creator.html',
})
export class NotificationCreatorPage {

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
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
