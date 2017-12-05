import { Component } from '@angular/core';

/**
 * Generated class for the ResetPasswordFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'reset-password-form',
  templateUrl: 'reset-password-form.html'
})
export class ResetPasswordFormComponent {

  text: string;

  constructor() {
    console.log('Hello ResetPasswordFormComponent Component');
    this.text = 'Hello World';
  }

}
