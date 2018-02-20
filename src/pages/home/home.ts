import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform, Events } from 'ionic-angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
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
    this.timestamp();
  }

  timestamp() {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate);
    this.displayDate = moment().format('MMM D YYYY');
    this.displayDate = this.displayDate.toUpperCase();
    console.log("Display date is " + this.displayDate);
    let rawTimeString = moment().format('YYYYMMDDhhmmss');
    this.rawTime = parseInt(rawTimeString);
    console.log("Raw Time is " + this.rawTime);
    this.displayTime = moment().format('h:mma');
    console.log("Display time is " + this.displayTime);
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}