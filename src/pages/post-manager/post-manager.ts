import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { PinCreatorPage } from '../pin-creator/pin-creator';

import moment from 'moment';

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
    public navCtrl: NavController
  ) {
    this.displaySelectedDay = moment().format("MMM D YYYY");
    this.postType = "pins";
    console.log("Post type is " + this.postType);
    let calendarEvents = this.eventSource;
    this.eventSource = [];
    setTimeout(() => {
      this.eventSource = calendarEvents;
    });
  }
  
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D YYYY");
  }

  onEventSelected(event) {
  }

  pushPinCreatorPage() {
    this.navCtrl.push(PinCreatorPage);
  }

}
