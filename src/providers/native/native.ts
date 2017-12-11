import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class NativeProvider {

  constructor(
    public emailComposer: EmailComposer
  ) {
  }

  composeEmail(email) {
    return this.emailComposer.open(email);    
  }

}
