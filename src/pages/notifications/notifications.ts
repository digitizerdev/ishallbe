import { Component } from '@angular/core';
import { trigger, 
         style, 
         transition, 
         animate, 
         query, 
         stagger } from '@angular/animations';

import { IonicPage, NavController } from 'ionic-angular';

import moment from 'moment';

import { PostPage } from '../post/post';
import { ProfilePage } from '../profile/profile';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(0,10px,0)` }), { optional: true }),
        query(':enter', stagger('100ms', [animate('300ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class NotificationsPage {

  rawDate: number;
  notificationsCol: any;
  readNotifications: any[] = [];
  unreadNotifications: any[] = [];
  viewingUser = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    this.viewingUser = false;
    this.firebase.notification = false;
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationsCol = this.firebase.afs.collection('notifications', ref => ref.
      where("receiverUid", "==", this.firebase.user.uid).
      where("message", "==", false).
      orderBy('timestamp', 'desc').limit(50));
    this.notificationsCol.valueChanges().subscribe((notifications) => {
      this.setNotifications(notifications);
    });
  }

  setNotifications(notifications) {
    this.unreadNotifications = [];
    this.readNotifications = [];
    notifications.forEach((notification) => {
      let date = moment.unix(notification.timestamp);
      notification.displayTimestamp = moment(date).fromNow();
      if (notification.read)
        this.readNotifications.push(notification);
      else
        this.unreadNotifications.push(notification);
    });
  }

  openNotification(notification) {
    if (!this.viewingUser) {
      let notificationPath = "notifications/" + notification.id;
      if (notification.collection == "pins")
        this.openPin(notification);
      if (notification.collection == "statements")
        this.openStatement(notification);
      if (notification.collection == "goals")
        this.openGoal(notification)
      if (notification.reminder)
        this.openGoal(notification);
      this.firebase.afs.doc(notificationPath).update({ read: true });
    }
  }

  openPin(notification) {
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "pins"
    });
  }

  openStatement(notification) {
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "statements"
    });
  }

  openGoal(notification) {
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "goals"
    });
  }

  setRootProfilePage() {
    this.navCtrl.setRoot(ProfilePage);
  }

  viewUser(uid) {
    this.viewingUser = true;
    if (uid !== this.firebase.user.uid)
      this.navCtrl.push(ProfilePage, { uid: uid });
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}
