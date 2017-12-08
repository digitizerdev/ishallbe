import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
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

  object(path) {
    return this.afdb.object(path);
  }

  list(path) {
    return this.afdb.list(path);
  }

}
