import { Injectable } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { UploadProvider } from '../upload/upload';

@Injectable()
export class FirebaseProvider {

  constructor
    (
    public afdb: AngularFireDatabase,
    public afa: AngularFireAuth,
    ) {
  }

  object(path): FirebaseObjectObservable<any> {
    return this.afdb.object(path);
  }

  setObject(path, obj) {
    return this.object(path).set(obj);
  }

  updateObject(path, obj) {
    return this.object(path).update(obj)
  }

  list(path): FirebaseListObservable<any> {
    return this.afdb.list(path);
  }

  removeObject(path, obj) {
    return this.object(path).remove()
  }

  profile(uid) {
    let path = '/users/' + uid;
    return this.object(path)
  }

  account() {
    return this.afa.auth.currentUser;
  }

  authenticate(email, password) {
    return this.afa.auth.signInWithEmailAndPassword(email, password);
  }

  createAccount(email, password) {
    return this.afa.auth.createUserWithEmailAndPassword(email, password);
  }
  
  resetPassword(email) {
    return this.afa.auth.sendPasswordResetEmail(email)    
  }

  updateAccountEmail(email) {
    return this.account().updateEmail(email);
  }

  updateAccountPassword(password) {
    return this.account().updatePassword(password);
  }
}
