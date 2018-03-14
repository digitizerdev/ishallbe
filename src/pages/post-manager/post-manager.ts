import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { PinCreatorPage } from '../pin-creator/pin-creator';
import { PostPage } from '../post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-post-manager',
  templateUrl: 'post-manager.html',
})
export class PostManagerPage {

  postType: string;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  displaySelectedDay: string;
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
    private alertCtrl: AlertController,
    private firebase: FirebaseProvider
  ) {
    this.displaySelectedDay = moment().format("MMM D");
    this.postType = "pins";
    console.log("Post type is " + this.postType);
    this.loadPins().subscribe((pins) => {
      console.log("Pins Loaded");
      console.log(pins);
      let calendarEvents = this.eventSource;
      pins.forEach((pin) => {
        pin.startTime = new Date(pin.startTime);
        pin.endTime = new Date(pin.endTime);
        pin.allDay = true;
        console.log("Pushing Pin");
        console.log(pin);
        calendarEvents.push(pin);
      });
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = calendarEvents;
      });
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D");
  }

  onEventSelected(event) {
  let alert = this.alertCtrl.create({
      title: event.title,
      message: event.description,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Open',
          handler: () => {
            this.navCtrl.push(PostPage, { id: event.id })
          }
        }
      ]
    });
    alert.present();
  }
  
  loadPins() {
    return Observable.create((observer) => {
      console.log("Loading Pins");
      this.pins = this.firebase.afs.collection("pins");
      return this.pins.valueChanges().subscribe((pins) => {
        console.log("Got Pins");
        console.log(pins);
        observer.next(pins);
      });
    });
  }

  pushPinCreatorPage() {
    this.navCtrl.push(PinCreatorPage, { selectedDay: this.selectedDay });
  }
}
