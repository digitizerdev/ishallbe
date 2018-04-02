import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { PinCreatorPage } from '../pin-creator/pin-creator';
import { PostPage } from '../post/post';

import { FirebaseProvider } from '../../providers/firebase/firebase';

import moment from 'moment';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
  selector: 'page-post-manager',
  templateUrl: 'post-manager.html',
})
export class PostManagerPage {

  selectedDay = new Date();
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: this.selectedDay
  }
  pins: any;
  statements: any;
  goals: any;
  reportedStatements: any;
  reportedGoals: any;
  postType: string;
  viewTitle: string;
  displaySelectedDay: string;
  pinCreated = false;
  pinsLoaded = false;
  statementsReported = false;
  goalsReported = false;
  statementsLoaded = false;
  goalsLoaded = false;
  
  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
    this.displaySelectedDay = moment().format("MMM D");
    this.postType = "pins";
  }

  ionViewDidLoad() {
    this.loadPins().subscribe((pins) => {
      let calendarEvents = this.eventSource;
      pins.forEach((pin) => {
        pin.startTime = new Date(pin.startTime);
        pin.endTime = new Date(pin.endTime);
        pin.allDay = true;
        calendarEvents.push(pin);
      });
      this.eventSource = [];
      setTimeout(() => {
        this.eventSource = calendarEvents;
        this.pinsLoaded = true;
      });
    });
    this.loadGoals();
    this.loadStatements();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
    this.displaySelectedDay = moment(this.selectedDay).format("MMM D");
    if (ev.events.length == 0) this.pinCreated = false;
    else this.pinCreated = true;
  }

  onEventSelected(event) {
    this.navCtrl.push(PostPage,
      {
        id: event.id,
        type: 'pins'
      });
  }

  loadPins() {
    return Observable.create((observer) => {
      this.pins = this.firebase.afs.collection("pins");
      return this.pins.valueChanges().subscribe((pins) => {
        observer.next(pins);
      });
    });
  }

  loadStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('reported', '==', true)
      .orderBy('timestamp', 'desc'));
    statements.valueChanges().subscribe((statements) => {
      console.log("Got Reported Statements");
      console.log(statements);
      if (statements.length > 0) this.statementsReported = true;
      if (!this.statementsLoaded)
        this.setStatements(statements);
    });
  }

  setStatements(statements) {
    this.statements = [];
    statements.forEach((statement) => {
      let date = moment.unix(statement.timestamp);
      statement.displayTimestamp = moment(date).fromNow();
      this.statements.push(statement);
    });
    this.statementsLoaded = true;
  }

  loadGoals() {
    this.goals = [];
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('reported', '==', true).
        orderBy('timestamp', 'desc'));
    goals.valueChanges().subscribe((goals) => {
      console.log("Got Reported Goals");
      console.log(goals);
      if (goals.length > 0) this.goalsReported = true;
      if (!this.goalsLoaded)
        this.setGoals(goals);
    });
  }

  setGoals(goals) {
    goals.forEach((goal) => {
      if (!goal.complete) {
        let dueDate = moment.unix(goal.dueDate);
        goal.displayDueDate = moment(dueDate).fromNow();
        let timestamp = moment.unix(goal.timestamp);
        goal.displayTimestamp = moment(timestamp).fromNow();
        this.goals.push(goal);
      }
    });
    this.goalsLoaded = true;
  }

  pushPinCreatorPage() {
    this.navCtrl.push(PinCreatorPage, { selectedDay: this.selectedDay });
  }
}
