import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

import { User } from '../../../test-data/users/model';

import { Observable } from 'rxjs/Observable';

class Credentials {
  email: string;
  password: string;
}

@Injectable()
export class FirebaseProvider {

  private userDoc: AngularFirestoreDocument<User>;
  user: Observable<User>;
  uid: any;
  session: any;
  loaded: any
  hasSeenTutorial = false;

  constructor(
    public events: Events,
    public afs: AngularFirestore,
    public afa: AngularFireAuth
  ) {
      this.checkForSession();
  }

  checkForSession() {
    if (!this.loaded) {
      this.sessionExists().subscribe((session) => {
        if (session) { 
          this.session = true;
          this.events.publish('user:login');
        } else {
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
        if (session) { observer.next(true);
        } else { observer.next(false) }
      });
    });
  }

  loadUser() {
    let path = "users/" + this.afa.auth.currentUser.uid;
    return this.afs.doc(path);
  }

  register(credentials: Credentials) {
    return this.afa.auth
      .createUserWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
  }

  logIn(credentials: Credentials) {
    return this.afa.auth
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
  }

  logOut() {
    return this.afa.auth
      .signOut();
  }
}