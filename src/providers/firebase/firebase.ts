import { Injectable } from '@angular/core';

import { AlertController, Events } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import moment from 'moment';

import { User } from '../../../test-data/users/model';

@Injectable()
export class FirebaseProvider {

  userDoc: any;
  user: any;
  fcmToken: string;
  session = false;
  loaded = false;
  hasSeenTutorial = false;
  deployingUpdate = false;
  signingup = false;
  socialAuthentication = false;
  loggedOut = false;

  constructor(
    public alertCtrl: AlertController,
    public events: Events,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    this.checkForSession();
  }

  checkForSession() {
    console.log("Checking for Firebase Session");
    if (!this.loaded && !this.deployingUpdate) {
      this.loaded = true;
      this.sessionExists().subscribe((session) => {
        if (session) this.userExists();
        else this.endSession();
      });
    }
  }

  sessionExists() {
    console.log("Checking for Existance of Firebase Session");
    return Observable.create((observer) => {
      return this.afa.authState.subscribe((session) => {
        if (session) {
          if (this.socialAuthentication) {
            console.log("Authenticating through social provider");
          } else {
            console.log("Not signing up");
            observer.next(true);
          }
        }
        else observer.next(false);
      });
    });
  }

  userExists() {
    console.log("User Exists?");
    let userPath = "users/" + this.afa.auth.currentUser.uid;
    console.log("User path is " + userPath);
    this.userDoc = this.afs.doc(userPath);
    this.userDoc.valueChanges().subscribe((user) => {
      console.log("Got Firebase User");
      console.log(user);
      if (!this.loggedOut) {
        if (user)
        this.startSession(user);
      else
        this.signupUser();
      }
    });
  }

  signupUser() {
    console.log("Signing Up User");
    this.presentEULA().subscribe((accepted) => {
      if (accepted) {
        this.buildUser().subscribe((user) => {
          this.user = user;
          this.setUser().then(() => {
            this.startSession(user);
          });
        });
      } else this.endSession();
    });
  }

  presentEULA() {
    console.log("Presenting EULA");
    return Observable.create((observer: any) => {
      if (!this.signingup) {
        this.signingup = true;
        let alert = this.alertCtrl.create({
          title: 'Accept Terms of Service',
          message: 'Please confirm to continue',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                this.signingup = false;
                observer.next(false);
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                this.signingup = false;
                observer.next(true);
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  buildUser() {
    console.log("Building User");
    return Observable.create((observer) => {
      if (!this.fcmToken) this.fcmToken = "0";
      let timestamp = moment().unix();
      let displayTimestamp = moment().format('MMM D YYYY h:mmA');
      const user: User = {
        uid: this.afa.auth.currentUser.uid,
        fcmToken: this.fcmToken,
        name: this.afa.auth.currentUser.displayName,
        bio: "",
        email: this.afa.auth.currentUser.email,
        photo: this.afa.auth.currentUser.photoURL,
        blocked: false,
        displayTimestamp: displayTimestamp,
        timestamp: timestamp,
        instagram: "",
        linkedin: "",
        twitter: "",
        contributor: true,
        editor: false
      }
      console.log("User Built");
      console.log(user);
      observer.next(user);
    });
  }

  setUser() {
    console.log("Setting User");
    let path = '/users/' + this.afa.auth.currentUser.uid;
    return this.afs.doc(path).set(this.user);
  }

  startSession(user) {
    console.log("Starting Session");
    this.user = user;
    if (user.editor) this.events.publish("editor permission granted");
    else this.events.publish("editor permission not granted")
    this.session = true;
    this.socialAuthentication = false;
    this.events.publish('contributor permission granted');
  }

  endSession() {
    console.log("Ending Session");
    this.loggedOut = true;
    this.session = false;
    this.userDoc = null;
    this.user = null;
    this.loaded = false;
    this.events.publish('contributor permission not granted');
  }
}