import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

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
  private = false;

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
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

}