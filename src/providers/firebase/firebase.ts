import { Injectable } from '@angular/core';

import { Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { User } from '../../../test-data/users/model';

@Injectable()
export class FirebaseProvider {

  uid: string;
  fcmToken: string;
  timestamp: number;
  displayTimestamp: string;
  userDoc: any;
  user: any;
  session = false;
  loaded = false;
  hasSeenTutorial = false;
  loggingInWithFacebook = false; 

  constructor(
    public events: Events,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    console.log("Firebase Provider Constructed");
    this.checkForSession();
  }

  timeStampPage() {
    this.timestamp = moment().unix();
    this.displayTimestamp = moment().format('MMM D YYYY h:mmA');
  }

  checkForSession() {
    console.log("Checking For Session");
    if (!this.loaded) {
      this.sessionExists().subscribe((session) => {
        console.log("Got Session");
        console.log(session);
        if (session) {
          console.log("Session Found");
          this.uid = this.afa.auth.currentUser.uid
          this.loadUser();
          this.session = true;
          this.events.publish('user:login');
        } else {
          console.log("No Session Found");
          this.session = false;
          this.events.publish('user:logout');
        }
        this.loaded = true;
      });
    }
  }

  sessionExists() {
    return Observable.create((observer) => {
      return this.afa.authState.subscribe((session) => {
        if (session) {
          observer.next(true);
        } else { observer.next(false) }
      });
    });
  }

  loadUser() {
    console.log("Loading User");
    console.log(this.afa.auth.currentUser);
    let path = "users/" + this.uid;
    this.userDoc = this.afs.doc(path);
    this.userDoc.valueChanges().subscribe((user) => {
      if (user) {
        if (user.editor) { this.events.publish("login: editor") };
        this.user = user;
        console.log("Loaded Firebase User");
        console.log(user);
      } else {
        console.log("No user found");
        if (!this.loggingInWithFacebook) {
          this.generateUser().subscribe(() => {
            console.log("Generated User");
            this.loadUser();
          });
        }
      }
    });
  }

  generateUser() {
    console.log("Generating User");
    return Observable.create((observer) => {
      this.buildUser().subscribe((user) => {
        console.log("User Built");
        console.log(user);
        this.createUser(user).then(() => {
          observer.next();
        });
      });
    });
  }

  buildUser() {
    console.log("Building User");
    return Observable.create((observer) => {
      if (!this.fcmToken) this.fcmToken = "0";
      let timestamp = moment().unix();
      console.log("Timestamp is " + timestamp);
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      console.log("Display timestamp is " + displayTimestamp);
      const user: User = {
        uid: this.uid,
        fcmToken: this.fcmToken,
        name: this.afa.auth.currentUser.displayName,
        bio: "",
        email: this.afa.auth.currentUser.email,
        photo: "assets/img/default-profile.png",
        blocked: false,
        displayTimestamp: this.displayTimestamp,
        timestamp: this.timestamp,
        instagram: "",
        linkedin: "",
        twitter: "",
        contributor: true,
        editor: false
      }
      console.log(user);
      observer.next(user);
    });
  }

  createUser(user) {
    let path = '/users/' + this.uid;
    return this.afs.doc(path).set(user);
  }

}