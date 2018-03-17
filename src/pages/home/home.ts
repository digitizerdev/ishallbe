import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
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
  time: any;
  uid: any;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    console.log("Hello Home Page");
    this.timestamp();
    this.uid = "mQ2XaUVS46fKKJDo0u8ldPQdmnB3"
    console.log("My uid is " + this.uid);
  }

  timestamp() {
    console.log("Timestamping");
    this.rawDate = moment().unix();
    console.log("Raw Date is " + this.rawDate);
    this.displayDate = moment().format('MMM D YYYY').toUpperCase();
    console.log("Display Date is " + this.displayDate);
    this.time = moment();
    console.log("Raw time is " + this.time);
    console.log(moment(this.time).format('llll'));
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}