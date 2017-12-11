import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'
import * as firebase from 'firebase/app'
import 'firebase/storage'

@Injectable()
export class MediaProvider {

  fireStorage: any;
  constructor(

  ) {
    this.fireStorage = firebase.storage().ref()
  }

}
