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

  uid() {
    return Observable.create((observer: any) => {            
      return this.storage.get('uid').then(function(value) {
        observer.complete(value);
      });
    });
  };

  loggedIn() {
    return Observable.create((observer: any) => {                  
      return this.storage.get('loggedIn').then(function(value) {
        observer.complete(value);
      });
    });
  }

  role(): Promise <string>  {
    return this.storage.get('role').then(function(value) {
      return value;
    });
  }

  start(user) {
    return Observable.create((observer: any) => {      
      this.storage.set('loggedIn', user.loggedIn);
      this.storage.set('role', user.role);
      this.storage.set('uid', user.uid)
      observer.complete(true);
    });
  }

  end() {
    return Observable.create((observer:any) => {
      this.storage.remove('user')
      this.events.publish('user:loggedOut');
      observer.complete(true);
    })
  }
}