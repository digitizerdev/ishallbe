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
  submitted = false;
  browser = false;

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
    console.log("Setting Push Time")
    this.pushTime = moment(time).unix();
    console.log(this.pushTime)
    this.displayPushTime = moment(time).format('ha [on] dddd, MMMM Do');
    console.log(this.displayPushTime);
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
      pin: true,
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
