import { Component } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'terms-of-service',
  templateUrl: 'terms-of-service.html'
})
export class TermsOfServiceComponent {

  constructor(
    private iab: InAppBrowser
  ) {
  }

  openLink() {
    const browser = this.iab.create('https://docs.wixstatic.com/ugd/7905e6_240379278fa1486d8954001723621f33.pdf', '_system');
  }


}
