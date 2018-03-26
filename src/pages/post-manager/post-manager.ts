import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  selectedDay = new Date();
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  pins: any;
  reportedStatements: any;
  postType: string;
  viewTitle: string;
  displaySelectedDay: string;
  pinCreated = false;
  pinsLoaded = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    this.displaySelectedDay = moment().format("MMM D");
    this.postType = "pins";
  }

  ionViewDidLoad() {
    this.loadPins().subscribe((pins) => {
      let calendarEvents = this.eventSource;
      pins.forEach((pin) => {
        pin.startTime = new Date(pin.startTime);
        pin.endTime = new Date(pin.endTime);
        pin.allDay = true;
        calendarEvents.push(pin);
      });
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = calendarEvents;
        this.pinsLoaded = true;
      });
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D");
    if (ev.events.length == 0) this.pinCreated = false;
    else this.pinCreated = true;
  }

  onEventSelected(event) {
    this.navCtrl.push(PostPage,
      {
        id: event.id,
        type: 'pin'
      });
  }

  loadPins() {
    return Observable.create((observer) => {
      this.pins = this.firebase.afs.collection("pins");
      return this.pins.valueChanges().subscribe((pins) => {
        observer.next(pins);
      });
    });
  }

  pushPinCreatorPage() {
    this.navCtrl.push(PinCreatorPage, { selectedDay: this.selectedDay });
  }
}
