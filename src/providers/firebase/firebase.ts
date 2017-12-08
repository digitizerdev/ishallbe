import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/first';

@Injectable()
export class FirebaseProvider {

  user: Observable<any[]>;

  constructor
    (
    public afdb: AngularFireDatabase,
    public afa: AngularFireAuth
    ) {
  }

  current() {
    return this.afa.auth.currentUser;
  }

  changeAccountEmail(email) {
    return Observable.create((observer: any) => {
      return this.current().updateEmail(email).then((complete) => {
        observer.next(true);
      }).catch((error) => {
        observer.next(error);
      });
    });
  }

  changeAccountPassword(password) {
    return Observable.create((observer: any) => {
      return this.current().updatePassword(password).then((complete) => {
        observer.next(true);
      }).catch((error) => {
        observer.next(error);
      });
    });
  }
}
