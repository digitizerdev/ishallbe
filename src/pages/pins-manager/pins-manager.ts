import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CreatePinPage } from '../create-pin/create-pin';

@IonicPage()
@Component({
  selector: 'page-pins-manager',
  templateUrl: 'pins-manager.html',
})
export class PinsManagerPage {
  
  title = 'Manage Pins';
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
  }

  onViewTitleChanged(title) {

  }

  onTimeSelected(ev) {

  }

  onEventSelected(event) {

  }
  
  pushCreatePinPage() {
    this.navCtrl.push(CreatePinPage);
  }

}
