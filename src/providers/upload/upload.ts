import { Injectable } from '@angular/core';

import * as Firebase from 'firebase';
let firebase: any = Firebase;

import 'firebase/storage';

@Injectable()
export class UploadProvider {
  storage: any;
  
  constructor() {
    this.storage = firebase.storage();    
  }

  instance() {
    return firebase.default;
  }

}
