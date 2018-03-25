import { Component, Input } from '@angular/core';

import { NavController } from 'ionic-angular';

import moment from 'moment';
import { Observable } from 'rxjs/Observable';

import { PostPage } from '../../pages/post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@Component({
  selector: 'goals',
  templateUrl: 'goals.html'
})
export class GoalsComponent {
  @Input('mine') myGoals;

  rawDate: number;
  rawNextWeekDate: number;
  goals: any[];

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    console.log("Loaded Goals Component");
  }

  ngAfterViewInit() {
    console.log("Goals View Initialized");
    console.log("My Goals: " + this.myGoals);
    this.timestamp();
    this.loadGoals().subscribe((goals) => {
      console.log("Got goals");
      console.log(goals);
      this.setGoals(goals);
    });
  }

  timestamp() {
    console.log("Timestamping Page");
    this.rawDate = parseInt(moment().format('YYYYMMDD'));
    this.rawNextWeekDate = this.rawDate + 7;
  }

  loadGoals() {
    console.log("Loading Goals");
    return Observable.create((observer) => {
      let myGoals = this.firebase.afs.collection('goals');
      return myGoals.valueChanges().subscribe((goals) => {
        observer.next(goals);
      });
    });
  }

  setGoals(goals) {
    console.log("Setting Goals");
      this.goals = [];
      goals.forEach((goal) => {
        if (!goal.complete) {
          console.log("This goal is not complete");
          let dueDate = moment.unix(goal.dueDate);
          goal.displayDueDate = moment(dueDate).fromNow().toUpperCase();
          console.log("Goal Display Due Date is " + goal.displayDueDate);
          let timestamp = moment.unix(goal.timestamp);
          goal.displayTimestamp= moment(timestamp).fromNow();
          console.log("Goal Timestamp is " + goal.displayTimestamp);
          this.setDueDateWarningColor(goal).subscribe((goal) => {
            console.log("Pushing Goal");
            console.log(goal);
            this.goals.push(goal);
          });
        }
      });
      console.log(this.goals);
  }

  setDueDateWarningColor(goal) {
    console.log("Setting Due Date Warning Color");
    return Observable.create((observer) => {
      if (goal.dueDate < this.rawDate) goal.pastDue = true;
      else if (goal.dueDate < this.rawNextWeekDate) goal.dueInNextSevenDays = true;
      else goal.dueLater = true;
      observer.next(goal);
    });
  }

  viewGoal(id) {
    this.navCtrl.push(PostPage, { 
      id: id,
      type: "goal"
    });
  }
}
