import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import moment from 'moment';

import { PostPage } from '../post/post';
import { ChatPage } from '../chat/chat';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  rawDate: number;
  notificationsCol: any;
  readNotifications: any[];
  unreadNotifications: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
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
    let notificationPath = "notifications/" + notification.id;
    this.firebase.afs.doc(notificationPath).update({ read: true }).then(() => {
      if (notification.collection == "pins")
        this.openPin(notification);
      if (notification.collection == "statements")
        this.openStatement(notification);
      if (notification.collection == "goals")
        this.openGoal(notification)
      if (notification.message)
        this.openChat(notification);
    });
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

  openChat(notification) {
    this.navCtrl.push(ChatPage, {
      uid: notification.uid,
    });
  }

}
