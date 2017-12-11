import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/storage';

@Injectable()
export class UploadProvider {
  storage: any;
  
  constructor() {
    this.storage = firebase.storage();    
  }

}
