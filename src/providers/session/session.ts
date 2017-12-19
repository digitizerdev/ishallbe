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

  start(uid) {
    console.log("Starting session");
    console.log(uid);
    this.storage.ready().then(() => {
      console.log("Storage ready");
      this.storage.set('loggedIn', true);
      this.storage.set('uid', uid);
    })
  }

  end() {
    this.storage.ready().then(() => {
      this.storage.clear();      
    });
  }

  uid() {
    console.log("Getting uid");
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        console.log("Storage ready");
        return this.storage.get('uid').then((uid) => {
          console.log("Got uid");
          console.log(uid);
          if (uid) {
            observer.next(uid);
          } else {
            observer.complete(false);
          }
        });
      });
    });
  };

  loggedIn() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        return this.storage.get('loggedIn').then((loggedIn) => {
          if (loggedIn) {
            observer.next(loggedIn);
          } else {
            observer.complete(false);
          }
        });
      });
    });
  };

  role() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        return this.storage.get('role').then((role) => {
          if (role) {
            observer.next(role);
          } else {
            observer.complete(false);
          }
        });
      });
    });
  };

}