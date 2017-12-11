import { Component } from '@angular/core';

import { FirebaseProvider } from '../../providers/firebase/firebase';
import { SessionProvider } from '../../providers/session/session';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'profile-avatar',
  templateUrl: 'profile-avatar.html'
})
export class ProfileAvatarComponent {

  profile: any;

  constructor(
    public firebase: FirebaseProvider,
    public session: SessionProvider,
  ) {
  }

}
