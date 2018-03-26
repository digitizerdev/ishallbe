import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides } from 'ionic-angular';

import { NotificationsPage } from '../../pages/notifications/notifications';

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

  myAffirmations = false;
  postType = "statements";
  pins: any;
  statements: any;
  goals: any;
  pinStartDate: number;
  pinEndDate: number;
  dayNumber: number;
  timestamp: number;
  pinsLoaded = false;

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.timestampPage();
    this.loadPosts();
  }

  timestampPage() {
    this.timestamp = moment().unix();
    this.dayNumber = moment().isoWeekday();
    this.pinEndDate = parseInt(moment().format('YYYYMMDD'));
    this.pinStartDate = this.pinEndDate - this.dayNumber;
  }

  loadPosts() {
    this.loadPins();
    this.loadStatements();
    this.loadGoals();
  }

  loadPins() {
    let pins = this.firebase.afs.collection('pins');
    pins.valueChanges().subscribe((pins) => {
      if (!this.pinsLoaded) {
        this.pinsLoaded = true;
        this.setPins(pins).subscribe(() => {
          this.setSlider();
        });
      }
    });
  }

  setPins(pins) {
    return Observable.create((observer) => {
      this.pins = [];
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
      ref.orderBy('timestamp'));
    statements.valueChanges().subscribe((statements) => {
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
  }

  loadGoals() {
    let goals = this.firebase.afs.collection('goals');
    goals.valueChanges().subscribe((goals) => {
      this.setGoals(goals);
    });
  }

  setGoals(goals) {
    this.goals = [];
    goals.forEach((goal) => {
      if (!goal.complete) {
        let dueDate = moment.unix(goal.dueDate);
        goal.displayDueDate = moment(dueDate).fromNow();
        let timestamp = moment.unix(goal.timestamp);
        goal.displayTimestamp = moment(timestamp).fromNow();
        this.goals.push(goal);
      }
    });
  }

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}