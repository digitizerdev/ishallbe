import { Component, Input } from '@angular/core';

import moment from 'moment';

import { NavController } from 'ionic-angular';

import { PostPage } from '../../pages/post/post';

@Component({
  selector: 'goal',
  templateUrl: 'goal.html'
})
export class GoalComponent {
  @Input('post') goal;
  displayDueDate: string;
  timestamp: number;
  pastDue = false;
  dueIn24HoursOrLess = false;
  dueIn24HoursOrMore = false;

  constructor(
    private navCtrl: NavController
  ) {
  }

  ngOnInit() {
    console.log("Goal Component Initialized");
    console.log(this.goal);
    this.timestampGoal();
  }

  timestampGoal() {
    this.timestamp = moment().unix();
    console.log("Timestamp is " + this.timestamp);
    console.log("Goal Due Date is " + this.goal.dueDate);
    if (this.timestamp > this.goal.dueDate) this.pastDue = true;
    if (this.timestamp + 86400 > this.goal.dueDate && this.goal.dueDate > this.timestamp) this.dueIn24HoursOrLess = true;
    if (this.goal.dueDate > this.timestamp + 86400) this.dueIn24HoursOrMore = true;
    console.log("Past Due: " + this.pastDue);
    console.log("Due in 24 Hours or Less: " + this.dueIn24HoursOrLess);
    console.log("Due in 24 Hours or More: " + this.dueIn24HoursOrMore);
  }

  viewGoal() {
    this.navCtrl.push(PostPage, { 
      id: this.goal.id,
      type: "goals",
      opened: true
     });
  }
}
