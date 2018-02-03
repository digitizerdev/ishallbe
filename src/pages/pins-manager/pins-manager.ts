import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { CreatePinPage } from '../create-pin/create-pin';
import { PinPage } from '../pin/pin';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-pins-manager',
  templateUrl: 'pins-manager.html',
})
export class PinsManagerPage {

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  feedTimestamp: any;
  pins: any;
  pinsQuery: any;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  pin: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
  }
}