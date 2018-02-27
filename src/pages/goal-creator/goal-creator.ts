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
  dueDate: any;

  constructor(
    private datePicker: DatePicker
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GoalCreatorage');
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
      this.dueDate = moment(date).fromNow();
      console.log("Due date is " + this.dueDate);
    },
      (err) => { 
        console.error("Error: " + err);
      });
  }

}