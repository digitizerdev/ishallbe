import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class NativeProvider {

  constructor(
    public emailComposer: EmailComposer,
    public facebook: Facebook
  ) {
  }

  composeEmail(email) {
    return this.emailComposer.open(email);
  }

  authWithFacebook() {
    return new Promise((resolve, reject) => {
      this.facebook.getLoginStatus().then((res) => {
        if (res.status === 'connected') {
          resolve(res.authResponse.accessToken);
        } else {
          this.facebook
            .login(['email', 'public_profile'])
            .then((user) => {
              this.facebook.getAccessToken().then(resolve).catch(reject);
            })
            .catch(reject);
        }
      }).catch(reject);
    });
  }

}