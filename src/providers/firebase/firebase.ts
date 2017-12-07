import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';

@Injectable()
export class FirebaseProvider {

  constructor
  (
    public afdb: AngularFireDatabase,
    public afa: AngularFireAuth
  ) {
  }

}
