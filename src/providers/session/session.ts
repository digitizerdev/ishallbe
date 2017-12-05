import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class SessionProvider {

  user = {
    'contributor': true,
    'editor': false
  }

  constructor(
    public events: Events,
    public storage: Storage,    
  ) {
  }

  found() {
    return this.user;
  }
  
  editor() {
    return this.user.editor;
  }

  loginEditor() {
    this.events.publish('editor:login')
  }

  storeUser(user) {
    
  }

}
