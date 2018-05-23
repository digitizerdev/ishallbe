import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { Notification } from '../../../test-data/notifications/model';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';

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
  browser = false;
  sendNow = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider,
    private platform: Platform,
    private datePicker: DatePicker,
    private alertCtrl: AlertController
  ) {
  }

  ionViewDidLoad() {
    console.log("Loaded Notification Creator Page");
    if (!this.platform.is('cordova')) this.browser = true;
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
      format('ha [on] dddd, MMMM Do')) ;
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

  pickCordovaTime() {
    console.log("Picking Cordova Time");
    this.pushTime = null;
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((time) => {
      this.setPushTime(time);
    }, (err) => { });
  }

  pickBrowserTime() {
    console.log("Picking Browser Time");
    this.pushTime = null;
  }

  setPushTime(time) {
    console.log("Setting Push Time");
    this.pushTime = moment(time).add(4, 'hours').unix();
    console.log("Push Time is " + moment(this.pushTime).format('ha [on] dddd, MMMM Do'));
    this.sendNow = this.pushTimePassed(this.pushTime);
    console.log("Send Now?: " + this.sendNow);
    if (this.browser) this.displayPushTime = moment(time).add(4, 'hours').format('ha [on] dddd, MMMM Do');
    else this.displayPushTime = moment(time).format('ha [on] dddd, MMMM Do');
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
      if (form.valid)
        this.createNotification(form);
    }
  }

  createNotification(form) {
    console.log("Creating Notification");
    let id = this.firebase.afs.createId();
    if (this.sendNow) this.pushTime = moment().unix();
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
      sendNow: this.sendNow,
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
    });
    this.navCtrl.pop();
  }

  displayNotReadyAlert() {
    let alertMessage = "Please Set a Due Date";
    let alert = this.alertCtrl.create({
      title: 'Almost There!',
      subTitle: alertMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}
