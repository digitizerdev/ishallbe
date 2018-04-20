import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { NotificationsPage } from '../notifications/notifications';
import { StatementCreatorPage} from '../statement-creator/statement-creator';
import { GoalCreatorPage } from '../goal-creator/goal-creator';

import { Observable } from 'rxjs';
import moment from 'moment';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Slides) slider: Slides;

  pins: any[] = [];
  statements: any[] = [];
  goals: any[] = [];
  postStartDate: number;
  postEndDate: number;
  dayNumber: number;
  timestamp: number;
  pinsLoaded = false;
  statementsLoaded = false;
  goalsLoaded = false;
  newNotifications = false;
  noStatements = false;
  noGoals = false;
  postSegment = 'statements';

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    console.log("Page Entered")
    this.timestampPage();
    this.checkForNewNotifications();
    this.loadPosts();
  }

  timestampPage() {
    this.timestamp = moment().unix();
    this.dayNumber = moment().isoWeekday();
    this.postEndDate = parseInt(moment().format('YYYYMMDD'));
    this.postStartDate = this.postEndDate - this.dayNumber;
  }

  checkForNewNotifications() {
    let newNotifications = this.firebase.afs.collection('notifications', ref =>
      ref.where("receiverUid", "==", this.firebase.user.uid).
        where("read", "==", false).
        where("messages", "==", false));
    newNotifications.valueChanges().subscribe((myNewNotifications) => {
      if (myNewNotifications.length > 0) this.newNotifications = true;
      else this.newNotifications = false;
    });
  }

  loadPosts() {
    console.log("Loading Posts");
    this.loadPins();
    this.loadStatements();
    this.loadGoals();
  }

  loadPins() {
    let pins = this.firebase.afs.collection('pins', ref =>
      ref.orderBy('postDate').
        startAt(this.postStartDate).
        endAt(this.postEndDate));
    pins.valueChanges().subscribe((pins) => {
      if (!this.pinsLoaded) {
        this.setPins(pins).subscribe(() => {
          this.pinsLoaded = true;
          this.setSlider();
        });
      }
    });
  }

  setPins(pins) {
    return Observable.create((observer) => {
      pins.forEach((pin) => {
        this.pins.push(pin);
      });
      observer.next();
    });
  }

  setSlider() {
    setTimeout(() => {
      this.slider.slideTo(this.dayNumber);
    }, 500);
  }

  loadStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('private', '==', false).
        where('reported', '==', false)
        .orderBy('timestamp', 'desc').
        startAt(this.postStartDate).endAt(this.postEndDate));
    statements.valueChanges().subscribe((statements) => {
      console.log("Got statements");
      console.log(statements);
      if (statements.length > 0) {
        if (!this.statementsLoaded)
          this.setStatements(statements);
      } else {
        this.noStatements = true;
      }
    });
  }

  setStatements(statements) {
    statements.forEach((statement) => {
      let date = moment.unix(statement.timestamp);
      statement.displayTimestamp = moment(date).fromNow();
      this.statements.push(statement);
    });
    this.statementsLoaded = true;
  }

  loadGoals() {
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('private', '==', false).
        where('reported', '==', false).
        orderBy('timestamp', 'desc').
        startAt(this.postStartDate).endAt(this.postEndDate));
    goals.valueChanges().subscribe((goals) => {
      console.log("Got goals");
      console.log(goals);
      if (goals.length > 0) {
        if (!this.goalsLoaded)
          this.setGoals(goals);
      } else {
        this.noGoals = true
      }
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

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  setRootStatementCreatorPage() {
    this.navCtrl.setRoot(StatementCreatorPage);
  }

  setRootGoalCreatorPage() {
    this.navCtrl.setRoot(GoalCreatorPage);
  }
}