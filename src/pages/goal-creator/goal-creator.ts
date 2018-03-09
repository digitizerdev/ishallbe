import { Component } from '@angular/core';

import { IonicPage } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import moment from 'moment';
declare var cordova: any;


@IonicPage()
@Component({
  selector: 'page-goal-creator',
  templateUrl: 'goal-creator.html',
})
export class GoalCreatorPage {
  createGoalForm: {
    title?: string;
    description?: string,
  } = {};
  submitted = false;
  contentMethod: string;
  rawDate: number;
  rawNextWeekDate: number;
  rawDueDate: number;
  displayDueDate: string;
  audio: any;
  audioUrl: string;
  audioName: string;
  dateSelected = false;
  recording = false;
  dueToday = false;
  dueThisWeek = false;
  dueLater = false;

  constructor(
    private datePicker: DatePicker,
  ) {
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate);
    this.rawNextWeekDate = this.rawDate + 7;
    console.log("Raw next week date is " + this.rawNextWeekDate);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCreatorage');
  }

  pickDate() {
    console.log("Picking date");
    this.dueToday = false;
    this.dueThisWeek = false;
    this.dueLater = false;
    this.displayDueDate = "";
    this.rawDueDate = 0;
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((date) => {
      console.log("Raw date is: " + date);
      let dueDateString = moment(date).format('YYYYMMDD');
      this.rawDueDate = parseInt(dueDateString);
      console.log("Raw Due Date is " + this.rawDueDate);
      this.displayDueDate = moment(date).fromNow();
      console.log("Display Due date is " + this.displayDueDate);
      this.formateDueDate();
    }, (err) => { console.error("Error: " + err); });
  }

  formateDueDate() {
    console.log("Formatting Due Date");
    if (this.rawDueDate == this.rawDate) this.dueToday = true;
    else if (this.rawDueDate < this.rawNextWeekDate) this.dueThisWeek = true;
    else this.dueLater = true;
    this.dateSelected = true;
  }

  recordAudio() {
    console.log("Record Audio Triggered");
    this.contentMethod = "audio";
    this.recording = true;
  }
}