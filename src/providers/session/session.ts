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

  storeUser(user) {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
        this.storage.set('user', user);
        this.events.publish('user:loggedIn');
      }).catch(console.log);
    });
  }

  retrieveUser() {
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

  editor() {
    return Observable.create((observer: any) => {
      return this.storage.ready().then(() => {
      this.storage.get('user').then((user) => {
        if (user.editor) {
          observer.next(user);
        } else {
          observer.next(false);
        }
      });
      });
    });
  }

  loginEditor() {
    this.events.publish('editor:login')
  }

}