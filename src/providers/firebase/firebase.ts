import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';

class Credentials {
  email: string;
  password: string;
}

@Injectable()
export class FirebaseProvider {

  profileID: any;
 
  constructor
    (
    public afdb: AngularFireDatabase,
    private afAuth: AngularFireAuth,
  ) {
  }

  register(credentials: Credentials) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
  }

  logIn(credentials: Credentials) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password,
      );
  }

  logOut() {
    return this.afAuth.auth
      .signOut();
  }

  sendPasswordResetEmail(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(
      email
    );
  }
  
  resetPassword(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email)    
  }

  account() {
    return this.afAuth.auth.currentUser;
  }

  object(path): FirebaseObjectObservable<any> {
    return this.afdb.object(path)
  }

  list(path): FirebaseListObservable<any> {
    return this.afdb.list(path)
  }

  limitedList(queryParameters) {
    let path = queryParameters.path;
    let limit = queryParameters.limitToLast;
    return this.afdb.list(path, {
      query: {
        limitToLast: limit
      }
    }).take(1);
  }

  orderedList(path, fieldName) {
    return this.afdb.list(path, {
      query: {
        orderByValue: fieldName
      },
    }).take(1);
  }

  queriedList(path, fieldName, fieldValue) {
    return this.afdb.list(path, {
      query: {
        orderByChild: fieldName,
        equalTo: fieldValue,
      }
    }).take(1);
  }

  queriedLimitedList(path, fieldName, fieldValue, limit) {
    return this.afdb.list(path, {
      query: {
        orderByChild: fieldName,
        equalTo: fieldValue,
        limitToLast: limit        
      }
    }).take(1);
  }

  queriedRangeList(queryParameters) {
    console.log("Query parameters are ");
    console.log(queryParameters);
    let path = queryParameters.path;
    let limitToLast = queryParameters.limitToLast;
    let orderByChild = queryParameters.orderByChild;
    let endAt = queryParameters.endAt;
    return this.afdb.list(path, {
      query: {
        orderByChild: 'date',
        endAt: "1/8/2018",
        limitToFirst: 4
      }
    }).take(1);
  }
  
}
