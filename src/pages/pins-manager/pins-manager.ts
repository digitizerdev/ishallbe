import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

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
