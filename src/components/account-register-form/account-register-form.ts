import { Component } from '@angular/core';

/**
 * Generated class for the AccountRegisterFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-register-form',
  templateUrl: 'account-register-form.html'
})
export class AccountRegisterFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountRegisterFormComponent Component');
    this.text = 'Hello World';
  }

}
