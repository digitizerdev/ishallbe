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

  profile(uid) {
    let path = '/users/' + uid;
    return this.object(path)
  }

  updateAccountEmail(email) {
    return this.account().updateEmail(email);
  }

  updateAccountPassword(password) {
    return Observable.create((observer: any) => {
      return this.account().updatePassword(password).then(() => {
        observer.next(true);
      }, (error) =>  {
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
    return this.object(path).set(obj);
  }

  updateObject(path, obj) {
    return this.object(path).update(obj)
  }

  removeObject(path, obj) {
    return this.object(path).remove()
  }
}
