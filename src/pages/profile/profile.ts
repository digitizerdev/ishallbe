import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import moment from 'moment';

import { HomePage } from '../home/home';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { ChatsPage } from '../chats/chats';
import { ChatPage } from '../chat/chat';
import { StatementCreatorPage } from '../statement-creator/statement-creator';
import { GoalCreatorPage } from '../goal-creator/goal-creator';

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
  photo: string;
  userPath: string;
  mine = false;
  loaded = false;
  statementsLoaded = false;
  goalsLoaded = false;
  editor = false;
  userEditor = false;
  blocked = false;
  newMessages = false;
  noStatements = false;
  noGoals = false;
  completedGoals = false;
  postSegment = 'statements';

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private inAppBrowser: InAppBrowser,
    private firebase: FirebaseProvider
  ) {
  }

  ionViewDidEnter() {
    console.log("Entered Profile");
    this.uid = this.navParams.get('uid');
    if (!this.uid) {
      this.mine = true;
      this.uid = this.firebase.afa.auth.currentUser.uid;
    }
    this.editor = this.firebase.user.editor;
    this.checkForNewMessages();
    this.loadUser();
    if (this.mine) this.loadAllMyPosts();
    else this.loadMyPublicPosts();
  }

  checkForNewMessages() {
    let chatsPath = "users/" + this.uid + "/chats";
    let chats = this.firebase.afs.collection(chatsPath);
    chats.valueChanges().subscribe((myChats) => {
      this.flagNewMessages(myChats);
    });
  }

  flagNewMessages(chats) {
    let recentNewMessages = false;
    chats.forEach((chat) => {
      if (chat.newMessages) {
        recentNewMessages = true;
      }
    });
    if (recentNewMessages) this.newMessages = true;
    else this.newMessages = false;
  }

  loadUser() {
    let path = "users/" + this.uid;
    this.user = this.firebase.afs.doc(path);
    this.user.valueChanges().subscribe((user) => {
      this.user = user;
      this.userEditor = user.editor;
      this.blocked = user.blocked;
      this.photo = user.photo;
      this.userPath = "users/" + this.uid;
      this.loaded = true;
    });
  }

  openLink(link) {
    let hyperlink = "https://" + link;
    this.inAppBrowser.create(hyperlink, '_system');
  }

  loadAllMyPosts() {
    console.log("Loading All My Posts");
    this.loadAllStatements();
    this.loadAllIncompleteGoals();
  }

  loadMyPublicPosts() {
    console.log("Loading My Public Posts");
    this.loadPublicStatements();
    this.loadPublicGoals();
  }

  loadAllStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('uid', '==', this.uid).
        orderBy('timestamp', 'desc').limit(50));
    statements.valueChanges().subscribe((statements) => {
      if (statements.length > 0) {
        if (!this.statementsLoaded)
          this.setStatements(statements);
      } else this.noStatements = true;
    });
  }

  loadPublicStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('uid', '==', this.uid).
        where('private', '==', false).
        orderBy('timestamp', 'desc').limit(50));
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

  loadPublicGoals() {
    console.log("Loading Public Goals");
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('uid', '==', this.uid).
        where('private', '==', false).
        orderBy('dueDate', 'asc').limit(50));
    goals.valueChanges().subscribe((goals) => {
      console.log("Got Public Goals");
      console.log(goals);
      if (!this.goalsLoaded)
        this.setGoals(goals);
    });
  }

  loadAllGoals() {
    console.log("Loading All Goals");
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('uid', '==', this.uid).
        orderBy('dueDate', 'desc').limit(50));
    goals.valueChanges().subscribe((goals) => {
      if (!this.goalsLoaded)
        this.setGoals(goals);
    });
  }

  loadAllIncompleteGoals() {
    console.log("Loading All Incomplete Goals");
    let goals = this.firebase.afs.collection('goals', ref =>
    ref.where('uid', '==', this.uid).
      where('complete', '==', false).
      orderBy('dueDate', 'asc').limit(50));
  goals.valueChanges().subscribe((goals) => {
    if (!this.goalsLoaded)
      this.setGoals(goals);
  });
  }

  setGoals(goals) {
    this.goals = [];
    if (!goals) this.noGoals = true;
    goals.forEach((goal) => {
      let dueDate = moment.unix(goal.dueDate);
      goal.displayDueDate = moment(dueDate).fromNow();
      let timestamp = moment.unix(goal.timestamp);
      goal.displayTimestamp = moment(timestamp).fromNow();
      this.goals.push(goal);
    });
    this.goalsLoaded = true;
  }

  toggleCompletedGoals() {
    console.log("Toggling Completed Goals");
    console.log("Completed Goals: " + this.completedGoals);
    this.goalsLoaded = false;
    if (this.completedGoals) this.loadAllGoals();
    else this.loadAllIncompleteGoals();
  }

  blockUser() {
    this.firebase.afs.doc(this.userPath).update({ blocked: true });
  }

  unblockUser() {
    this.firebase.afs.doc(this.userPath).update({ blocked: false });
  }

  makeEditor() {
    this.firebase.afs.doc(this.userPath).update({ editor: true });
  }

  makeContributor() {
    this.firebase.afs.doc(this.userPath).update({ editor: false });
  }

  refreshPage(refresh) {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  pushProfileUpdatePage() {
    this.navCtrl.push(ProfileUpdatePage);
  }

  pushChatsPage() {
    this.navCtrl.push(ChatsPage);
  }

  pushChatPage() {
    this.navCtrl.push(ChatPage, { uid: this.uid });
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

  setRootStatementCreatorPage() {
    this.navCtrl.setRoot(StatementCreatorPage);
  }

  setRootGoalCreatorPage() {
    this.navCtrl.setRoot(GoalCreatorPage);
  }
}
