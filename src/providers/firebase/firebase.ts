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
  uid: string;
  fcmToken: string;
  session = false;
  loaded = false;
  hasSeenTutorial = false;
  loggingInWithFacebook = false;

  constructor(
    public events: Events,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    this.checkForSession();
  }

  checkForSession() {
    if (!this.loaded) {
      this.loaded = true;
      this.sessionExists().subscribe((session) => {
        if (session) this.startSession();
        else this.endSession();
      });
    }
  }

  sessionExists() {
    return Observable.create((observer) => {
      return this.afa.authState.subscribe((session) => {
        if (session) observer.next(true);
        else observer.next(false);
      });
    });
  }

  startSession() {
    this.uid = this.afa.auth.currentUser.uid
    this.userExists();
    this.session = true;
    this.events.publish('contributor permission granted');
  }

  userExists() {
    let path = "users/" + this.uid;
    this.userDoc = this.afs.doc(path);
    this.userDoc.valueChanges().subscribe((user) => {
      if (user)
        this.loadUser(user);
      else
        this.generateUser();
    });
  }

  loadUser(user) {
    if(this.fcmToken) 
      user.fcmToken = this.fcmToken;
    this.user = user;
    if (user.editor)
      this.events.publish("editor permission granted");
    else
      this.events.publish("editor permission not granted")
    this.setUser();
  }

  generateUser() {
    if (!this.loggingInWithFacebook) {
      this.buildUser().subscribe((user) => {
        this.user = user;
        this.setUser().then(() => {
          this.loadUser(user);
        });
      });
    }
  }

  buildUser() {
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
    let path = '/users/' + this.uid;
    return this.afs.doc(path).set(this.user);
  }

  endSession() {
    this.session = false;
    this.events.publish('contributor permission not granted');
  }

  setNotification() {
    console.log("Set Notification Triggered");
  }
}