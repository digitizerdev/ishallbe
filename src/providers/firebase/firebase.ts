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

  updateAccountEmail(email) {
    return this.current().updateEmail(email).then(function () {
        return true;
       }).catch(function (error) {
        return error;
    });
  }

  updateAccountPassword(password) {
    return this.current().updatePassword(password).then(function () {
      return true;  
      }).catch(function (error) {
        return error;
    });
  }
}
