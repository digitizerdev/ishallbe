import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonicModule, Platform, NavController } from 'ionic-angular';
import * as firebase from 'firebase';

import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'social-facebook',
  templateUrl: 'social-facebook.html'

})
export class SocialFacebookComponent {

  session = {
    editor: true,
    contributor: false
  }

  constructor(
    public platform: Platform,
    public navCtrl: NavController
  ) { 
  }

  loginWithFacebook() {
    this.chooseMethod(true);        
  }

  chooseMethod(isCordova) {
    if (isCordova) {
      this.authWithFacebookCordova();
    } else {
      this.authWithFacebookBrowser();
    }
  }

  authWithFacebookCordova() {
    this.session = {
      editor: true,
      contributor: false
    }
    this.navCtrl.setRoot(HomePage);
  }

  authWithFacebookBrowser() {
    this.session = {
      editor: true,
      contributor: false
    }
    this.navCtrl.setRoot(HomePage);    
  }

}
