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
  postSegment = 'statements';

  constructor(
    private navCtrl: NavController,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
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
      if (!this.statementsLoaded)
        this.setStatements(statements);
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

  showNotifications() {
    this.navCtrl.push(NotificationsPage);
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }
}