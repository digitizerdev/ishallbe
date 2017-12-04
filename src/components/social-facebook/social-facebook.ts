import { Component } from '@angular/core';
import { IonicModule } from 'ionic-angular';

@Component({
  selector: 'social-facebook',
  templateUrl: 'social-facebook.html'

})
export class SocialFacebookComponent {

  text: string;

  constructor() {
    console.log('Hello SocialFacebookComponent Component');
    this.text = 'Hello World';
  }

}
