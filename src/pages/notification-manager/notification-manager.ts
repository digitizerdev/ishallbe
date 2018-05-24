import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { trigger,state,style,transition,animate,keyframes, query, stagger } from '@angular/animations';

import { NotificationCreatorPage } from '../notification-creator/notification-creator';

import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

@IonicPage()
@Component({
  selector: 'page-notification-manager',
  templateUrl: 'notification-manager.html',
  animations: [

    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true }),

        query(':leave', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ]),
    trigger('explainerAnimation', [
      transition('* => *', [
        query('.col', style({ opacity: 0, transform: 'translateX(-40px)' })),

        query('.col', stagger('500ms', [
          animate('800ms 1.2s ease-out', style({ opacity: 1, transform: 'translateX(0)' })),
        ])),

        query('.col', [
          animate(1000, style('*'))
        ])

      ])
    ])
  ],
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
      where('receiverUid', '==', 'all'));
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
