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
    this.storage.ready().then(() => {
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
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        return this.storage.get('uid').then((uid) => {
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

}