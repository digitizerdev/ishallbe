import { Component } from '@angular/core';

/**
 * Generated class for the AccountEmailFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-email-form',
  templateUrl: 'account-email-form.html'
})
export class AccountEmailFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountEmailFormComponent Component');
    this.text = 'Hello World';
  }

}
