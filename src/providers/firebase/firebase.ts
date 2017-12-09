import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class FirebaseProvider {

  user: any;

  constructor
    (
    public afdb: AngularFireDatabase,
    public afa: AngularFireAuth
    ) {
  }

  account() {
    return this.afa.auth.currentUser;
  }

  updateAccountEmail(email) {
    return Observable.create((observer: any) => {
      return this.account().updateEmail(email).then(function () {
        observer.complete(true);
      }, function (error) {
        observer.throw(error);
      });
    });
  }

  updateAccountPassword(password) {
    return Observable.create((observer: any) => {
      return this.account().updatePassword(password).then(function () {
        observer.complete(true);
      }, function (error) {
        observer.throw(error);
      });
    });
  }

  object(path): FirebaseObjectObservable<any> {
    return this.afdb.object(path);
  }

  list(path): FirebaseListObservable<any> {
    return this.afdb.list(path);
  }

  setObject(path, obj) {
    return Observable.create((observer: any) => {
      return this.object(path).set(obj).then(function () {
        observer.complete(true);
      }, function (error) {
        observer.throw(error);
      });
    });
  }

  updateObject(path, obj) {
    return Observable.create((observer: any) => {
      return this.object(path).update(obj).then(function () {
        observer.complete(true);
      }, function (error) {
        observer.throw(error);
      });
    });
  }

  removeObject(path, obj) {
    return Observable.create((observer: any) => {
      return this.object(path).remove().then(function () {
        observer.complete(true);
      }, function (error) {
        observer.throw(error);
      });
    });
  }
}
