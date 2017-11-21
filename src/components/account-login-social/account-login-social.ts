import { Component } from '@angular/core';

/**
 * Generated class for the AccountLoginSocialComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-login-social',
  templateUrl: 'account-login-social.html'
})
export class AccountLoginSocialComponent {

  text: string;

  constructor() {
    console.log('Hello AccountLoginSocialComponent Component');
    this.text = 'Hello World';
  }

}
