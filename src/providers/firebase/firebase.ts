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
    return this.account().updateEmail(email).then(function () {
        return true;
       }).catch(function (error) {
        return error;
    });
  }

  updateAccountPassword(password) {
    return this.account().updatePassword(password).then(function () {
      return true;  
      }).catch(function (error) {
        return error;
    });
  }

  profile(uid) {
    return this.afdb.object('/users/' + uid);
  }

  createProfile(profile) {
    this.profile(profile.uid).set(profile);
  }

}
