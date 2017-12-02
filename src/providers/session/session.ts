import { Injectable } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  user = false;

  constructor() {
  }

  exists() {
    return false;
  }

  another() {

  }
}
