import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SessionProvider {

  user = {
    'contributor': true,
    'editor': false
  }

  constructor() {
  }

  found() {
    return this.user;
  }

}
