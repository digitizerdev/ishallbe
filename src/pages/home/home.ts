import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Moment, lang } from 'moment';
import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { NotificationsPage } from '../../pages/notifications/notifications';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  rawDate: number;
  displayDate: string;
  rawTime: number;
  displayTime: string;

  constructor(
    private platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private firebase: FirebaseProvider,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private events: Events,
    private push: Push
  ) {
    this.timeStampPage();
  }

  timeStampPage() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    this.displayDate = moment().format('MMM D, YYYY');
    let rawTimeString = moment().format('YYYYMMDDhhmmss');
    this.rawTime = parseInt(rawTimeString);
    this.displayTime = moment().format('h:mma');
    console.log("Raw date is " + this.rawDate);
    console.log("Display date is " + this.displayDate);
    console.log("Raw Time is " + this.rawTime);
    console.log("Display time is " + this.displayTime);
  }

  ionViewDidLoad() {
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }
}