import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import moment from 'moment';

import { DatePicker } from '@ionic-native/date-picker';

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
  contentMethod: any;
  rawDate: any;
  rawNextWeekDate: any;
  rawDueDate: any;
  displayDueDate: any;
  dateSelected = false;
  recording = false;
  recorded = false;
  dueToday = false;
  dueThisWeek = false;
  dueLater = false;

  constructor(
    private datePicker: DatePicker
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

  startRecording() {
    console.log("Record triggered");
    this.contentMethod = "audio";
    this.recording = true;
  }

  pickDate() {
    console.log("Picking date");
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDates: false,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then((date) => { 
      console.log("Raw date is: " + date);
      this.rawDueDate = moment(date, "YYYYMMDD").fromNow();
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

}