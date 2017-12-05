import { Component } from '@angular/core';

/**
 * Generated class for the AccountNameFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-name-form',
  templateUrl: 'account-name-form.html'
})
export class AccountNameFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountNameFormComponent Component');
    this.text = 'Hello World';
  }

}
