import { Component } from '@angular/core';

/**
 * Generated class for the AccountLoginFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-login-form',
  templateUrl: 'account-login-form.html'
})
export class AccountLoginFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountLoginFormComponent Component');
    this.text = 'Hello World';
  }

}
