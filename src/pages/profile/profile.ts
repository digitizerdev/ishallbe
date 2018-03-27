import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Observable } from 'rxjs';
import moment from 'moment';

import { HomePage } from '../home/home';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { MessagesPage } from '../messages/messages';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  statements: any[] = [];
  goals: any[] = [];
  user: any;
  uid: string;
  mine = false;
  loaded = false;
  statementsLoaded = false;
  goalsLoaded = false;
  postSegment = 'statements';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidLoad() {
    this.uid = this.navParams.get('uid');
    if (!this.uid) {
      this.mine = true;
      this.uid = this.firebase.uid;
    }
    this.loadUser();
    this.loadPosts();
  }

  loadUser() {
    let path = "users/" + this.uid;
    this.user = this.firebase.afs.doc(path);
    this.user.valueChanges().subscribe((user) => {
      console.log("Got user");
      console.log(user);
      this.user = user;
      this.loaded = true;
    });
  }

  openLink(link) {
    let hyperlink = "https://" + link;
    this.inAppBrowser.create(hyperlink, '_system');
  }

  loadPosts() {
    this.loadStatements();
    this.loadGoals();
  }

  loadStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.orderBy('timestamp'));
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
    let goals = this.firebase.afs.collection('goals');
    goals.valueChanges().subscribe((goals) => {
      if(!this.goalsLoaded)
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

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  pushProfileUpdatePage() {
    this.navCtrl.push(ProfileUpdatePage);
  }

  pushMessagesPage() {
    this.navCtrl.push(MessagesPage);
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
