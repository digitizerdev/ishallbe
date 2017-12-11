import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {

  constructor
    (
    public afdb: AngularFireDatabase,
    public afa: AngularFireAuth
    ) {
  }

  profile(uid) {
    let path = '/users/' + uid;
    return this.object(path)
  }

  account() {
    return this.afa.auth.currentUser;
  }

  createAccount(email, password) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }

  updateAccountEmail(email) {
    return this.account().updateEmail(email);
  }

  updateAccountPassword(password) {
    return this.account().updatePassword(password);
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
