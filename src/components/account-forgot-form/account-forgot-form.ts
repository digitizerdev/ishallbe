import { Component } from '@angular/core';

/**
 * Generated class for the AccountForgotFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-forgot-form',
  templateUrl: 'account-forgot-form.html'
})
export class AccountForgotFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountForgotFormComponent Component');
    this.text = 'Hello World';
  }

}
