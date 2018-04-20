import { Injectable } from '@angular/core';

import { AlertController, Events, Platform } from 'ionic-angular';
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
  signingUp = false;
  socialAuthentication = false;

  constructor(
    public alertCtrl: AlertController,
    public events: Events,
    public platform: Platform,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
    if (!this.loaded) {
      this.loaded = true;
      this.checkForSession();
    }
    this.listenToPostEvents();
  }

  checkForSession() {
    this.afa.authState.subscribe((session) => {
      if (session) this.userExists();
      else this.endSession();
    });
  }

  endSession() {
    this.session = false;
    this.userDoc = null;
    this.user = null;
    this.loaded = false;
    if (this.afa.auth.currentUser)
      this.afa.auth.signOut();
    this.events.publish('contributor permission not granted');
  }

  userExists() {
    let userPath = "users/" + this.afa.auth.currentUser.uid;
    this.userDoc = this.afs.doc(userPath);
    this.userDoc.valueChanges().subscribe((user) => {
      if (!user)
        this.registerUser();
      else if (user.blocked) {
        this.blockUser();
      } else {
        this.startSession(user);
      }
    });
  }

  blockUser() {
    this.endSession();
    let alert = this.alertCtrl.create({
      title: 'User Blocked',
      message: 'Please contact us at info@ishallbe.co',
      buttons: [
        {
          text: 'Okay'
        }
      ]
    });
    alert.present();
  }

  startSession(user) {
    this.user = user;
    this.syncFcmToken();
    if (this.user.editor) this.events.publish("editor permission granted");
    else this.events.publish("editor permission not granted")
    this.session = true;
    this.socialAuthentication = false;
    this.events.publish('contributor permission granted');
  }

  syncFcmToken() {
    if (this.platform.is('cordova')) {
      if (this.user.fcmToken !== this.fcmToken) {
        let userPath = "users" + this.user.uid;
        this.afs.doc(userPath).update({ fcmToken: this.fcmToken });
      }
    }
  }

  registerUser() {
    if (this.socialAuthentication) {
      this.showTutorial();
    }
    else {
      this.createNonSocialUser().then(() => {
        this.showTutorial();
      });
    }
  }

  showTutorial() {
    this.events.publish('show tutorial')
  }

  createNonSocialUser() {
    return this.afa.auth.currentUser.updateProfile({
      displayName: "Unnamed User",
      photoURL: "assets/img/default-profile.png"
    });
  }

  signupUser() {
    this.presentEULA().subscribe((accepted) => {
      if (!accepted) this.deleteUser();
      else {
        this.buildUser().subscribe((user) => {
          this.user = user;
          this.setUser().then(() => {
            this.startSession(user);
          });
        });
      }
    });
  }

  presentEULA() {
    return Observable.create((observer: any) => {
      if (!this.signingUp) {
        this.signingUp = true;
        let alert = this.alertCtrl.create({
          title: 'Accept Terms of Service',
          message: 'Please confirm to continue',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler: () => {
                this.signingUp = false;
                observer.next(false);
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                this.signingUp = false;
                observer.next(true);
              }
            }
          ]
        });
        alert.present();
      }
    });
  }

  deleteUser() {
    this.afa.auth.currentUser.delete().then(() => {
      this.endSession();
    })
  }

  buildUser() {
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
    let path = '/users/' + this.afa.auth.currentUser.uid;
    return this.afs.doc(path).set(this.user);
  }

  listenToPostEvents() {
    this.events.subscribe('post deleted', (post) => {
      let postPath = post.collection + "/" + post.id;
      this.afs.doc(postPath).delete();
    });
  }
}
