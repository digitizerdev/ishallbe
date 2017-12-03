import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  user = true;

  constructor() {
  }

  exists() {
    return this.user;
  }

}
