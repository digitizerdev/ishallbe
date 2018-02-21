import { Component } from '@angular/core';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { mockPosts } from '../../../test-data/posts/mocks';

@Component({
  selector: 'goals',
  templateUrl: 'goals.html'
})
export class GoalsComponent {

  rawDate: number;
  rawNextWeekDate: number;
  goals: any[];

  constructor() {
    console.log('Hello Goals Component');
    let rawDateString = moment().format('YYYYMMDD');
    this.rawDate = parseInt(rawDateString);
    console.log("Raw date is " + this.rawDate); 
    this.rawNextWeekDate = this.rawDate + 7;
    console.log("Raw next week date is " + this.rawNextWeekDate);
    this.setGoals();
  }

  setGoals() {
    this.goals = [];
    mockPosts.forEach((post) => {
      if (post.goal) {
        console.log("Pushing goal");
        post.displayDateDue = moment(post.rawDateDue, "YYYYMMDDhhmmss").fromNow();
        this.setDueDateWarningColor(post).subscribe((post) => {
          this.goals.push(post);
        });
      }
    });
    console.log("Finished pushing goals");
    console.log(this.goals);
  }

  setDueDateWarningColor(goal) {
    return Observable.create((observer) => {
      if (goal.rawDateDue < this.rawDate) goal.pastDue = true;
      else if (goal.rawDateDue < this.rawNextWeekDate) goal.dueInNextSevenDays = true;
      else goal.dueLater = true;
      console.log("Set due date warning color");
      console.log(goal);
      observer.next(goal);
    });
  }
}
