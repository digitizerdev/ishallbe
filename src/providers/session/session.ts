import { Injectable } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  user = false;

  constructor() {
    console.log('Hello SessionProvider Provider');
  }

  exists() {
    return false;
  }

  another() {
    
  }
}
