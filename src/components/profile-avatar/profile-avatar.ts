import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile-avatar',
  templateUrl: 'profile-avatar.html'
})
export class ProfileAvatarComponent {

  constructor(
    public firebase: FirebaseProvider,
    public session: SessionProvider,
    public storage: Storage
  ) {
    this.wakeUp();
  }

  wakeUp() {
    this.retrieveUserUID().subscribe((uid)=>{
      console.log("Got user id");
      console.log(uid);
    })
  }

  retrieveUserUID() {
    return Observable.create((observer: any) => {                        
      let uid = this.session.uid();
      observer.next(uid);
    });
  }

}
