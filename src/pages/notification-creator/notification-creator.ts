import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Notification } from '../../../test-data/notifications/model';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-notification-creator',
  templateUrl: 'notification-creator.html',
})
export class NotificationCreatorPage {
  createNotificationForm: {
    description?: string
  }
  pushTime: number;
  displayPushTime: string;
  nextAvailablePushTime: string;
  submitted = false;
  sendNow = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Notification Creator Page");
    let minTime = moment().unix();
    console.log("Original min time is " + minTime);
    minTime = minTime - 36000;
    console.log("Minimum time is " + moment.unix(minTime).format());
    if (this.missedPushTime(moment().unix())) {
      console.log("Next Available Push Time is " + moment().hour(parseInt(moment().
        format('HH'))).minute(45).second(0).add(2, 'hour').
        format('ha [on] dddd, MMMM Do'));
      this.nextAvailablePushTime = moment().hour(parseInt(moment().
        format('HH'))).minute(45).second(0).add(2, 'hour').format();
      console.log("In unix: " + moment(this.nextAvailablePushTime).unix());
    } else {
      console.log("Next Available Push Time is " +
        moment().hour(parseInt(moment().
          format('HH'))).minute(45).second(0).add(1, 'hour').
          format('ha [on] dddd, MMMM Do'));
      this.nextAvailablePushTime = moment().hour(parseInt(moment().
        format('HH'))).minute(45).second(0).add(1, 'hour').format();
      console.log("In unix: " + moment(this.nextAvailablePushTime).unix());
    }
  }

  missedPushTime(time) {
    console.log("Getting Whether I Missed This Hour's Push Time");
    console.log("Inputted time: " + time);
    let thisHourPushTime = moment().hour(parseInt(moment().format('HH'))).minute(45).second(0).unix();
    console.log("This Hour Push Time: " + thisHourPushTime);
    if (time > thisHourPushTime) {
      console.log("Push Time Passed");
      console.log(time - thisHourPushTime + " seconds past the push time");
      return true;
    } else {
      console.log("Push Time Upcoming");
      console.log(thisHourPushTime - time + " seconds until the push time");
      return false;
    }
  }

  getCurrentTime() {
    return moment().format();
  }

  pickTime() {
    console.log("Picking Time");
    this.pushTime = null;
  }

  setPushTime(time) {
    console.log("Setting Push Time");
    this.pushTime = moment(time).add(4, 'hours').unix();
    console.log("Push Time is " + moment(this.pushTime).format('ha [on] dddd, MMMM Do'));
    this.sendNow = this.pushTimePassed(this.pushTime);
    console.log("Send Now?: " + this.sendNow);
    this.displayPushTime = moment(time).add(4, 'hours').format('ha [on] dddd, MMMM Do');
    console.log("Scheduled for " + this.displayPushTime);
  }

  pushTimePassed(pushTime) {
    console.log("Checking to see if we can make this push time");
    console.log("Inputted Push Time: " + pushTime);
    console.log("Next Available Push Time: " + this.nextAvailablePushTime);
    console.log("In Unix: " + moment(this.nextAvailablePushTime).unix());
    if (pushTime < moment(this.nextAvailablePushTime).unix()) {
      console.log("Push Time Passed");
      return true;
    } else {
      console.log("Push Time Not Passed");
      return false;
    }
  }

  submit(form) {
    console.log("Submitting");
    this.submitted = true;
    if (!this.pushTime) this.displayNotReadyAlert();
    else {
      if (form.valid) {
        if (!this.sendNow) {
          this.scheduleNotification(form);
        } else {
          this.pushNotification(form)
        }
      }
    }
  }

  scheduleNotification(form) {
    console.log("Creating Notification");
    let id = this.firebase.afs.createId();
    let notification: Notification = {
      id: id,
      uid: this.firebase.user.uid,
      name: this.firebase.user.name,
      face: this.firebase.user.photo,
      description: form.description,
      read: false,
      collection: 'pins',
      docId: id, 
      receiverUid: 'all',
      sendNow: false,
      message: false,
      pinLike: false,
      statementLike: false,
      goalLike: false,
      commentLike: false,
      comment: false,
      reminder: false,
      displayTimestamp: this.displayPushTime,
      timestamp: this.pushTime
    }
    this.firebase.afs.doc('notifications/' + id).set(notification).then(() => {
      console.log("Notification Created");
      console.log(notification);
      this.navCtrl.pop();
    });
  }

  pushNotification(form) {
    console.log("Pushing Notification");
    this.buildNotification(form).subscribe((notification) => {
      console.log("Built Payload");
      console.log(notification);
      let notificationPath = "notifications/" + notification.id;
      this.firebase.afs.doc(notificationPath).set(notification).then(() => {
        this.navCtrl.pop();
      });
    });
  }

  buildNotification(form) {
    return Observable.create((observer) => {
      let id = this.firebase.afs.createId();
      let displayTimestamp = moment().format('MMM DD YYYY');
      let timestamp = moment().unix();
      let notification: Notification = {
        id: id,
        uid: this.firebase.user.uid,
        name: this.firebase.user.name,
        face: this.firebase.user.photo,
        description: form.description,
        read: false,
        collection: "notifications",
        docId: id,
        receiverUid: "all",
        sendNow: true,
        message: true,
        pinLike: false,
        statementLike: false,
        goalLike: false,
        comment: false,
        commentLike: false,
        reminder: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp
      }
      observer.next(notification);
    });
  }

  displayNotReadyAlert() {
    let alertMessage = "Please Select a Push Time";
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}