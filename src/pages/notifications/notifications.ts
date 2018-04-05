import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
    private navParams: NavParams,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadNotifications();
  }

  loadNotifications() {
    console.log("Loading Notifications");
    this.notificationsCol = this.firebase.afs.collection('notifications', ref => ref.
      where("receiverUid", "==", this.firebase.user.uid).
      where("message", "==", false).
      orderBy('timestamp', 'desc'));
    this.notificationsCol.valueChanges().subscribe((notifications) => {
      console.log("Got notifications");
      console.log(notifications);
      this.setNotifications(notifications);
    });
  }

  setNotifications(notifications) {
    console.log("Setting Notifications");
    this.unreadNotifications = [];
    this.readNotifications = [];
    notifications.forEach((notification) => {
      let date = moment.unix(notification.timestamp);
      notification.displayTimestamp = moment(date).fromNow();
      console.log("Pushing notification");
      console.log(notification);
      if (notification.read)
        this.readNotifications.push(notification);
      else
        this.unreadNotifications.push(notification);
    });
  }

  openNotification(notification) {
    console.log("Opening Notification");
    console.log(notification);
    let notificationPath = "notifications/" + notification.id;
    console.log("Notification path is " + notificationPath);
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
    console.log("Opening pin");
    console.log(notification);
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "pins"
    });
  }

  openStatement(notification) {
    console.log("Opening Statement");
    console.log(notification);
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "statements"
    });
  }

  openGoal(notification) {
    console.log("Opening Goal");
    console.log(notification);
    this.navCtrl.push(PostPage, {
      id: notification.docId,
      type: "goals"
    });
  }

  openChat(notification) {
    console.log("Opening Chat");
    console.log(notification);
    this.navCtrl.push(ChatPage, {
      uid: notification.uid,
    });
  }

}
