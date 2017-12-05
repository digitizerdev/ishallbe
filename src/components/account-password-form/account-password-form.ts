import { Component } from '@angular/core';

/**
 * Generated class for the AccountPasswordFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'account-password-form',
  templateUrl: 'account-password-form.html'
})
export class AccountPasswordFormComponent {

  text: string;

  constructor() {
    console.log('Hello AccountPasswordFormComponent Component');
    this.text = 'Hello World';
  }

}
