import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {

  constructor
  (
    public fireData: AngularFireDatabase,
    public fireAuth: AngularFireAuth
  ) {
  }

  emailAuth(submission) {
    
  }

}
