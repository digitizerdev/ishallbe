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

  postType: string;
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  displaySelectedDay: string;
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  pins: any;
  pinCreated = false;
  reportedStatements: any;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    this.displaySelectedDay = moment().format("MMM D");
    this.postType = "pins";
    console.log("Post type is " + this.postType);
  }

  ionViewDidLoad() {
    this.loadPins().subscribe((pins) => {
      console.log("Pins Loaded");
      console.log(pins);
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
      });
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    console.log("On Time Selected");
    this.selectedDay = ev.selectedTime;
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D");
    console.log(ev);
    if (ev.events.length == 0 ) this.pinCreated = false;
    else this.pinCreated = true;
  }

  onEventSelected(event) {
    this.navCtrl.push(PostPage, { id: event.id })
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
