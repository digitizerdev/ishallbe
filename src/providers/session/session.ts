import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionProvider {

  constructor(
    public events: Events,
    public storage: Storage,
  ) {
  }

  start(user) {
    let role = user.role;
    let uid = user.uid
    this.storage.set('loggedIn', true);
    this.storage.set('role', role);
    this.storage.set('uid', uid)
  }

  end() {
    this.storage.remove('loggedIn');
    this.storage.remove('role');
    this.storage.remove('uid');
  }

  uid() {
    return Observable.create((observer: any) => {
      return this.storage.get('uid').then((uid) => {
        console.log("UID: " + uid);        
        if (uid) {
          observer.next(uid);
        } else {
          observer.complete(false);
        }
      });
    });
  };

  loggedIn() {
    return Observable.create((observer: any) => {
      return this.storage.get('loggedIn').then((loggedIn) => {
        console.log("Logged In: " + loggedIn);
        if (loggedIn) {
          observer.next(loggedIn);
        } else {
          observer.complete(false);
        }
      });
    });
  };

  role() {
    return Observable.create((observer: any) => {
      return this.storage.get('role').then((role) => {
        console.log("Role: " + role);        
        if (role) {
          observer.next(role);
        } else {
          observer.complete(false);
        }
      });
    });
  };

}