import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { CreatePinPage } from '../create-pin/create-pin';

@IonicPage()
@Component({
  selector: 'page-pins-manager',
  templateUrl: 'pins-manager.html',
})
export class PinsManagerPage {
  
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();

  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
  }

  ionViewDidLoad() {
    this.loadPins().subscribe((event) => {
      console.log("Got event");
      console.log(event);
      let calendarEvents = this.eventSource;
      calendarEvents.push(event);
      console.log("Calendar events is " );
      console.log(calendarEvents);
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = calendarEvents;
      })
    });
  }

  loadPins() {
    return Observable.create((observer) => {
      let myTestEvent = {
        title: "Test Event",
        startTime: new Date(),
        endTime: new Date(),
        allDay: true
      }
      observer.next(myTestEvent);
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
  }

  pushCreatePinPage() {
    this.navCtrl.push(CreatePinPage, {selectedDay: this.selectedDay});
  }

}
