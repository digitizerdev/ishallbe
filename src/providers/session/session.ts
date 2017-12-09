import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class SessionProvider {

  constructor(
    public events: Events,
    public storage: Storage,
  ) {
  }
  
  start(user) {
    console.log("start triggered");
    console.log(user);
    let role = user.role;
    let uid = user.uid
    this.storage.set('loggedIn', true);
    this.storage.set('role', role);
    this.storage.set('uid', uid)
  }

  end() {
    this.storage.remove('user')
    this.events.publish('user:loggedOut');
  }

  uid() {
    return Observable.create((observer: any) => {
      return this.storage.get('uid').then((uid) => {
        if (uid) {
          observer.complete(uid);
        } else {
          observer.complete(false);
        }
      });
    });
  };

  loggedIn() {
    return Observable.create((observer: any) => {
      return this.storage.get('loggedIn').then((loggedIn) => {
        if (loggedIn) {
          observer.complete(loggedIn);
        } else {
          observer.complete(false);
        }
      });
    });
  };

  role() {
    return Observable.create((observer: any) => {
      return this.storage.get('role').then((role) => {
        if (role) {
          observer.complete(role);
        } else {
          observer.complete(false);
        }
      });
    });
  };

}