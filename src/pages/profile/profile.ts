import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import moment from 'moment';

import { HomePage } from '../home/home';
import { ProfileUpdatePage } from '../profile-update/profile-update';
import { ChatsPage } from '../chats/chats';
import { ChatPage } from '../chat/chat';

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
  mine = false;
  loaded = false;
  statementsLoaded = false;
  goalsLoaded = false;
  editor = false;
  userEditor = false;
  blocked = false;
  userPath: string;
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
      this.uid = this.firebase.afa.auth.currentUser.uid;
    }
    this.editor = this.firebase.user.editor;
    this.loadUser();
    if (this.mine) this.loadAllMyPosts();
    else this.loadMyPublicPosts();
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
    this.loadAllStatements();
    this.loadAllGoals();
  }

  loadMyPublicPosts() {
    this.loadPublicStatements();
    this.loadPublicGoals();
  }

  loadAllStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('uid', '==', this.uid).
        orderBy('timestamp', 'desc'));
    statements.valueChanges().subscribe((statements) => {
      if (!this.statementsLoaded)
        this.setStatements(statements);
    });
  }

  loadPublicStatements() {
    let statements = this.firebase.afs.collection('statements', ref =>
      ref.where('uid', '==', this.uid).
        where('private', '==', false).
        orderBy('timestamp', 'desc'));
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

  loadAllGoals() {
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('uid', '==', this.uid).
      orderBy('timestamp', 'desc'));
    goals.valueChanges().subscribe((goals) => {
      if (!this.goalsLoaded)
        this.setGoals(goals);
    });
  }

  loadPublicGoals() {
    let goals = this.firebase.afs.collection('goals', ref =>
      ref.where('uid', '==', this.uid).
      where('private', '==', false).
      orderBy('timestamp', 'desc'));
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

  blockUser() {
    console.log("Blocking User");
    this.firebase.afs.doc(this.userPath).update({ blocked: true});
  }

  unblockUser() {
    console.log("Unblocking User");
    this.firebase.afs.doc(this.userPath).update({ blocked: false});
  }

  makeEditor() {
    console.log("Making Editor");
    this.firebase.afs.doc(this.userPath).update({ editor: true});
  }

  makeContributor() {
    console.log("Making Contributor");
    this.firebase.afs.doc(this.userPath).update({editor: false});
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
    console.log("Pushing chat page");
    this.navCtrl.push(ChatPage, { uid: this.uid});
  }

  setRootHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
