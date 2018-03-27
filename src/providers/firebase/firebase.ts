import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { User } from '../../../test-data/users/model';

@Injectable()
export class FirebaseProvider {

  userDoc: any;
  user: any;
  facebookAuth: any;
  uid: string;
  fcmToken: string;
  session = false;
  loaded = false;
  hasSeenTutorial = false;
  facebookRegistration = false;

  constructor(
    public events: Events,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    this.checkForSession();
  }

  checkForSession() {
    console.log("Checking for Firebase Session");
    if (!this.loaded) {
      this.loaded = true;
      this.sessionExists().subscribe((session) => {
        if (session) this.startSession();
        else this.endSession();
      });
    }
  }

  sessionExists() {
    console.log("Checking for Existance of Firebase Session");
    return Observable.create((observer) => {
      return this.afa.authState.subscribe((session) => {
        if (session) observer.next(true);
        else observer.next(false);
      });
    });
  }

  startSession() {
    console.log("Starting Session");
    this.uid = this.afa.auth.currentUser.uid
    this.userExists();
    this.session = true;
    this.events.publish('contributor permission granted');
  }

  userExists() {
    console.log("User Exists?");
    let path = "users/" + this.uid;
    this.userDoc = this.afs.doc(path);
    this.userDoc.valueChanges().subscribe((user) => {
      console.log("Got Firebase User");
      console.log(user);
      if (!this.facebookRegistration) {
        if (user)
          this.loadUser(user);
        else
          this.generateUser();
      }
    });
  }

  loadUser(user) {
    console.log("Loading User");
    if (this.fcmToken)
      user.fcmToken = this.fcmToken;
    this.user = user;
    if (user.editor)
      this.events.publish("editor permission granted");
    else
      this.events.publish("editor permission not granted")
    this.setUser();
  }

  generateUser() {
    console.log("Generating User");
    this.buildUser().subscribe((user) => {
      this.user = user;
      this.setUser().then(() => {
        this.loadUser(user);
      });
    });
  }

  buildUser() {
    console.log("Building User");
    return Observable.create((observer) => {
      if (!this.fcmToken) this.fcmToken = "0";
      let timestamp = moment().unix();
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      const user: User = {
        uid: this.uid,
        fcmToken: this.fcmToken,
        name: this.afa.auth.currentUser.displayName,
        bio: "",
        email: this.afa.auth.currentUser.email,
        photo: "assets/img/default-profile.png",
        blocked: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        instagram: "",
        linkedin: "",
        twitter: "",
        contributor: true,
        editor: false
      }
      observer.next(user);
    });
  }

  setUser() {
    console.log("Setting User");
    let path = '/users/' + this.uid;
    return this.afs.doc(path).set(this.user);
  }

  endSession() {
    console.log("Ending Session");
    this.session = false;
    this.events.publish('contributor permission not granted');
  }
}