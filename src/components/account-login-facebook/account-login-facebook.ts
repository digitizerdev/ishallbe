import { Component } from '@angular/core';

/**
 * Generated class for the AccountLoginFacebookComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-login-facebook',
  templateUrl: 'account-login-facebook.html'
})
export class AccountLoginFacebookComponent {

  text: string;

  constructor() {
    console.log('Hello AccountLoginFacebookComponent Component');
    this.text = 'Hello World';
  }

}
