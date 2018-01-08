import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { CreatePinPage } from '../create-pin/create-pin';

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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.loadPins().subscribe((pins) => {
      console.log("Got pins");
      console.log(pins);
      let calendarEvents = this.eventSource;
      pins.forEach((pin) => {
        console.log("Got pin");
        console.log(pin);
        pin.startTime = new Date(pin.startTime);
        console.log("New start time is " + pin.starTime);
        pin.endTime = new Date(pin.endTime);
        console.log("New end time is " + pin.endTime);
        calendarEvents.push(pin);
      });
      console.log("Calendar events is ");
      console.log(calendarEvents);
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = calendarEvents;
      })
    });
  }

  loadPins() {
    return Observable.create((observer) => {
      this.pins = [];
      this.preparePinsRequest().subscribe((queryParameters) => {
        this.pinsQuery = queryParameters;
        this.requestPins().subscribe((pins) => {
          observer.next(pins);
        });
      });
    });
  }

  preparePinsRequest() {
    return Observable.create((observer) => {
      let queryParameters = {
        path: '/pins/',
        orderByValue: 'date',
        limitToLast: 60
      }
      observer.next(queryParameters)
    });
  }

  requestPins() {
    return this.firebase.limitedList(this.pinsQuery);
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event) {
    let alert = this.alertCtrl.create({
      title: event.title,
      message: 'Open Pin?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  pushCreatePinPage() {
    this.navCtrl.push(CreatePinPage, { selectedDay: this.selectedDay });
  }

}
