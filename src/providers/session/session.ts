import { Injectable, NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

import { ComponentsModule } from '../../components/components.module';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';

@Injectable()
export class SessionProvider {

  user = {
    'loggedIn': false,
    'editor': false,
    'uid': ''
  }

  constructor(
    public events: Events,
    public storage: Storage,
  ) {
  }

  current() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        this.storage.get('user').then((user) => {
          if (user) {
            this.user = user;
            observer.next(user);
          } else {
            observer.next(false);
          }
        });
      });
    });
  }

  start(user) {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        this.storage.set('user', user);
      }).catch(console.log);
    });
  }

  end() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        this.storage.remove('user').then((user) => {
          this.events.publish('user:loggedOut');
        });
      });
    });
  }

  currentEditor() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        this.storage.get('user').then((user) => {
          if (user.editor) {
            observer.next(true);
          } else {
            observer.next(false);
          }
        });
      });
    });
  }

  startEditor() {
    this.events.publish('editor:loggedIn');
  }

}