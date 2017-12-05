import { Component } from '@angular/core';

/**
 * Generated class for the LoginFacebookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-facebook',
  templateUrl: 'login-facebook.html'
})
export class LoginFacebookComponent {

  text: string;

  constructor() {
    console.log('Hello LoginFacebookComponent Component');
    this.text = 'Hello World';
  }

}
